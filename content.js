// FAB TCG to Fabrary Export Extension
(function() {
  'use strict';

  // Function to normalize card ID by removing suffix
  function normalizeCardId(cardId) {
    if (!cardId) return null;
    // Remove any suffix after the hyphen (e.g., ROS028-RF becomes ROS028)
    return cardId.replace(/^([A-Z]{3}\d{3})(-[A-Z]+)?$/, '$1');
  }

  // Function to extract card ID from various possible locations
  function extractCardId(cardElement) {
    let cardId = null;

    // Try to find card ID from data attributes
    if (cardElement.dataset.cardId) {
      cardId = cardElement.dataset.cardId;
    }

    // Try to find from class names (often contains card ID)
    if (!cardId) {
      const classes = cardElement.className.split(' ');
      for (const cls of classes) {
        if (cls.match(/^[A-Z]{3}\d{3}/)) {
          cardId = cls;
          break;
        }
      }
    }

    // Try to find from card image src
    if (!cardId) {
      const img = cardElement.querySelector('img');
      if (img && img.src) {
        const match = img.src.match(/([A-Z]{3}\d{3}(-[A-Z]+)?)/);
        if (match) {
          cardId = match[1];
        }
      }
    }

    // Try to find from links
    if (!cardId) {
      const link = cardElement.querySelector('a[href*="cards"]');
      if (link) {
        const match = link.href.match(/cards\/([A-Z]{3}\d{3}(-[A-Z]+)?)/);
        if (match) {
          cardId = match[1];
        }
      }
    }

    // Try to find from card name data
    if (!cardId && cardElement.dataset.cardName) {
      const textContent = cardElement.textContent;
      const match = textContent.match(/([A-Z]{3}\d{3}(-[A-Z]+)?)/);
      if (match) {
        cardId = match[1];
      }
    }

    return normalizeCardId(cardId);
  }

  // Function to extract all cards from the decklist
  function extractCards() {
    const cards = [];

    // Common selectors for card elements on FAB TCG website
    const selectors = [
      '.decklist-card',
      '.card-item',
      '[class*="card"]',
      'li[data-card]',
      '.deck-card',
      'tr[data-card]',
      '.card-list-item',
      'li'
    ];

    let cardElements = [];

    // Try each selector
    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        cardElements = Array.from(elements);
        console.log(`Found ${elements.length} elements with selector: ${selector}`);
        break;
      }
    }

    // If no specific card elements found, try to find cards by their IDs in text
    if (cardElements.length === 0) {
      // Look for card IDs in the entire page content
      const bodyText = document.body.innerText;
      const cardIdMatches = bodyText.matchAll(/([A-Z]{3}\d{3}(-[A-Z]+)?)/g);
      const foundIds = new Set();

      for (const match of cardIdMatches) {
        foundIds.add(match[1]);
      }

      // Try to find quantity information
      const lines = bodyText.split('\n');
      for (const line of lines) {
        const quantityMatch = line.match(/(\d+)x?\s+.*?([A-Z]{3}\d{3}(-[A-Z]+)?)/);
        if (quantityMatch) {
          const quantity = parseInt(quantityMatch[1]);
          const cardId = normalizeCardId(quantityMatch[2]);
          for (let i = 0; i < quantity; i++) {
            cards.push(cardId);
          }
        }
      }

      // If we still don't have cards with quantities, just add each unique ID once
      if (cards.length === 0) {
        foundIds.forEach(id => cards.push(normalizeCardId(id)));
      }
    } else {
      // Extract cards from card elements
      console.log('Extracting from card elements, sample element text:', cardElements[0]?.textContent?.substring(0, 100));

      for (const element of cardElements) {
        const cardId = extractCardId(element);
        if (cardId) {
          // Check for quantity
          const quantityElement = element.querySelector('[class*="quantity"], .qty, [data-quantity]');
          let quantity = 1;

          if (quantityElement) {
            const qtyText = quantityElement.textContent.trim();
            const qtyMatch = qtyText.match(/\d+/);
            if (qtyMatch) {
              quantity = parseInt(qtyMatch[0]);
            }
          } else {
            // Try to find quantity in the element text
            const text = element.textContent.trim();
            // Match patterns like "3x", "2x", or just "3 " at the start
            const qtyMatch = text.match(/^(\d+)\s*x?\s*/i);
            if (qtyMatch) {
              quantity = parseInt(qtyMatch[1]);
            }
          }

          // Add card multiple times based on quantity
          for (let i = 0; i < quantity; i++) {
            cards.push(cardId);
          }
        }
      }
    }

    return cards;
  }

  // Function to extract deck metadata
  function extractDeckMetadata() {
    const metadata = {
      playerName: '',
      event: '',
      rank: ''
    };

    // Try to find player name
    const playerSelectors = [
      '.player-name',
      '[class*="player"]',
      'h1',
      '.author',
      '[itemprop="author"]'
    ];

    for (const selector of playerSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        const text = element.textContent.trim();
        // Often the player name is before a dash or in the title
        const match = text.match(/^([^-–]+)/);
        if (match) {
          metadata.playerName = match[1].trim();
          break;
        }
      }
    }

    // Try to extract event and rank from page title or content
    const title = document.title || '';
    const h1 = document.querySelector('h1')?.textContent || '';
    const content = title + ' ' + h1;

    // Look for event name
    const eventMatch = content.match(/(Battle Hardened|Pro Tour|Calling|Skirmish|National Championship|World Championship|LDXP)[^-]*/i);
    if (eventMatch) {
      metadata.event = eventMatch[0].trim();
    }

    // Look for rank
    const rankMatch = content.match(/(1st|2nd|3rd|\d+th)(\s+place)?/i);
    if (rankMatch) {
      metadata.rank = rankMatch[1];
    }

    return metadata;
  }

  // Function to generate Fabrary import URL
  function generateFabraryUrl(cards, deckName) {
    const baseUrl = 'https://fabrary.net/decks';
    const params = new URLSearchParams();

    params.append('tab', 'import');
    params.append('format', 'classicconstructed');
    params.append('name', deckName || 'Imported Deck');

    // Add each card as a separate parameter
    cards.forEach(cardId => {
      params.append('cards', cardId);
    });

    return `${baseUrl}?${params.toString()}`;
  }

  // Function to check if this page has an actual decklist
  function hasDecklist() {
    // Try to find cards on the page
    const cards = extractCards();

    // Only show button if we found a reasonable number of cards (at least 10)
    // This prevents showing on list pages or pages without decklists
    return cards.length >= 10;
  }

  // Function to create and inject the export button
  function injectExportButton() {
    console.log('injectExportButton called');

    // Check if this page actually has a decklist
    if (!hasDecklist()) {
      console.log('No decklist found, not injecting button');
      return;
    }

    // Check if button already exists
    if (document.getElementById('fabrary-export-btn')) {
      console.log('Button already exists');
      return;
    }

    // Find the import button (could be GEM or other import services)
    // Try multiple strategies to find it
    let importButton = null;

    // Strategy 1: Look for any button/link with "import" text
    const allButtons = document.querySelectorAll('a, button');
    for (const btn of allButtons) {
      const text = btn.textContent.toLowerCase();
      if (text.includes('import to') || text.includes('export to')) {
        importButton = btn;
        console.log('Found import/export button by text:', btn.textContent.trim());
        break;
      }
    }

    // Strategy 2: Look for common import button classes/attributes
    if (!importButton) {
      const selectors = [
        'a[href*="gemtcg"]',
        'a[href*="import"]',
        'button[class*="import"]',
        'a[class*="btn"]',
        '.wp-block-button__link'
      ];

      for (const selector of selectors) {
        importButton = document.querySelector(selector);
        if (importButton) {
          console.log('Found import button with selector:', selector);
          break;
        }
      }
    }

    console.log('Import button found:', importButton);

    // Create the button
    const button = document.createElement('a');
    button.id = 'fabrary-export-btn';

    // Copy classes from import button if found, otherwise use default
    if (importButton) {
      button.className = importButton.className;
      console.log('Copied classes from import button:', button.className);
    } else {
      button.className = 'fabrary-export-button';
    }

    button.textContent = 'Export to Fabrary';
    button.style.cursor = 'pointer';
    button.style.display = 'inline-block';

    // Add click handler
    button.addEventListener('click', function() {
      try {
        // Extract cards and metadata
        const cards = extractCards();
        const metadata = extractDeckMetadata();

        // DEBUG: Output card list with counts
        console.log('=== FABRARY EXPORT DEBUG ===');
        console.log('Total cards found:', cards.length);

        // Count card occurrences
        const cardCounts = {};
        cards.forEach(cardId => {
          cardCounts[cardId] = (cardCounts[cardId] || 0) + 1;
        });

        console.log('Decklist:');
        Object.entries(cardCounts).forEach(([cardId, count]) => {
          console.log(`${count}x ${cardId}`);
        });

        console.log('Metadata:', metadata);
        console.log('========================');

        // Generate deck name
        let deckName = '';
        if (metadata.playerName) {
          deckName = metadata.playerName;
          if (metadata.event) {
            deckName += ' - ' + metadata.event;
          }
          if (metadata.rank) {
            deckName += ' - ' + metadata.rank;
          }
        } else {
          deckName = 'FAB TCG Deck Export';
        }

        // Generate URL
        const url = generateFabraryUrl(cards, deckName);

        // Open in new tab
        window.open(url, '_blank');

        // Visual feedback
        const originalBg = button.style.backgroundColor;
        button.textContent = 'Exported!';
        button.style.backgroundColor = '#4CAF50';
        button.style.borderColor = '#4CAF50';
        setTimeout(() => {
          button.textContent = 'Export to Fabrary';
          button.style.backgroundColor = originalBg;
          button.style.borderColor = originalBg;
        }, 2000);
      } catch (error) {
        console.error('Error exporting to Fabrary:', error);
        const originalBg = button.style.backgroundColor;
        button.textContent = 'Error!';
        button.style.backgroundColor = '#f44336';
        button.style.borderColor = '#f44336';
        setTimeout(() => {
          button.textContent = 'Export to Fabrary';
          button.style.backgroundColor = originalBg;
          button.style.borderColor = originalBg;
        }, 2000);
      }
    });

    // Find the import button and insert directly below it
    if (importButton) {
      console.log('Inserting button next to import button');
      // Make the button blue
      button.style.backgroundColor = '#2196F3';
      button.style.borderColor = '#2196F3';

      // Insert the button right after the import button
      importButton.parentNode.insertBefore(button, importButton.nextSibling);
      console.log('Button inserted successfully');
    } else {
      console.log('GEM button not found, trying fallback locations');
      // Fallback: try multiple possible locations
      const targetSelectors = [
        '.entry-header',
        '.post-header',
        'h1',
        '.decklist-header',
        'article header',
        'main'
      ];

      let targetElement = null;
      for (const selector of targetSelectors) {
        targetElement = document.querySelector(selector);
        if (targetElement) {
          console.log('Found target element with selector:', selector);
          break;
        }
      }

      if (targetElement) {
        console.log('Inserting button after target element');
        // Create a container for the button
        const container = document.createElement('div');
        container.className = 'fabrary-export-container';
        container.appendChild(button);

        // Insert after the target element
        targetElement.parentNode.insertBefore(container, targetElement.nextSibling);
        console.log('Button inserted successfully');
      } else {
        console.log('No target element found, using fixed position fallback');
        // Fallback: add to the top of the body
        const container = document.createElement('div');
        container.className = 'fabrary-export-container';
        container.style.position = 'fixed';
        container.style.top = '10px';
        container.style.right = '10px';
        container.style.zIndex = '9999';
        container.appendChild(button);
        document.body.appendChild(container);
        console.log('Button inserted in fixed position');
      }
    }
  }

  // Wait for page to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectExportButton);
  } else {
    injectExportButton();
  }
})();
