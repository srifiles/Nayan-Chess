document.addEventListener('DOMContentLoaded', () => {
  // --- Game Data & Piece Configurations ---
  const pieceConfigs = {
    pawn: {
      name: "Pawn",
      start: "e2",
      iconColor: "#FFE066",
      emoji: "🛡️",
      paths: [
        {
          end: "e3",
          narration: "The Pawn steps forward 1 square! 👣 Simple and steady!"
        },
        {
          end: "e4",
          narration: "From the starting line, the Pawn can take a BIG leap of 2 squares! 🦘 Hop, hop!"
        }
      ]
    },
    rook: {
      name: "Rook",
      start: "d4",
      iconColor: "#4E92FF",
      emoji: "🏰",
      paths: [
        {
          end: "d8",
          narration: "The Rook zoom-zooms straight UP! 🏰⬆️ All the way to the top!"
        },
        {
          end: "h4",
          narration: "The Rook slides all the way to the RIGHT! 🏰➡️ Like a sliding car!"
        },
        {
          end: "d1",
          narration: "The Rook zoom-zooms straight DOWN! 🏰⬇️ Speeding along!"
        },
        {
          end: "a4",
          narration: "The Rook slides all the way to the LEFT! 🏰⬅️ Nothing can block its path!"
        }
      ]
    },
    knight: {
      name: "Knight",
      start: "e4",
      iconColor: "#50E3C2",
      emoji: "🐴",
      isKnight: true, // Special movement style
      paths: [
        {
          end: "f6", // 2 up, 1 right
          narration: "Jumping Knight! 2 squares UP, and 1 square RIGHT! L-Shape! 🐴✨"
        },
        {
          end: "c5", // 2 up, 1 left
          narration: "Up, up, and to the side! 2 squares UP, and 1 square LEFT! 🐴✨"
        },
        {
          end: "g5", // 1 up, 2 right
          narration: "Leap! 1 square UP, and 2 squares RIGHT! Look at him jump! 🐴✨"
        },
        {
          end: "g3", // 1 down, 2 right
          narration: "Wheee! 1 square DOWN, and 2 squares RIGHT! Over the fence! 🐴✨"
        },
        {
          end: "f2", // 2 down, 1 right
          narration: "Yeehaw! 2 squares DOWN, and 1 square RIGHT! Gallop, gallop! 🐴✨"
        },
        {
          end: "d2", // 2 down, 1 left
          narration: "Soft landing! 2 squares DOWN, and 1 square LEFT! 🐴✨"
        },
        {
          end: "c3", // 1 down, 2 left
          narration: "Hop, hop, turn! 1 square DOWN, and 2 squares LEFT! 🐴✨"
        },
        {
          end: "c5", // repeats or alternative
          end: "c3"
        }
      ]
    },
    bishop: {
      name: "Bishop",
      start: "d4",
      iconColor: "#B8E986",
      emoji: "⛪",
      paths: [
        {
          end: "h8",
          narration: "The Bishop slides diagonally UP-RIGHT! ⛪↗️ Staying on the same color!"
        },
        {
          end: "a7",
          narration: "Bishop slides diagonally UP-LEFT! ⛪↖️ Gliding like a skater!"
        },
        {
          end: "a1",
          narration: "Bishop slides diagonally DOWN-LEFT! ⛪↙️ All the way to the corner!"
        },
        {
          end: "g1",
          narration: "Bishop slides diagonally DOWN-RIGHT! ⛪↘️ Smooth and fast!"
        }
      ]
    },
    queen: {
      name: "Queen",
      start: "d4",
      iconColor: "#F8E71C",
      emoji: "👑⚡",
      paths: [
        {
          end: "d8",
          narration: "The Queen zooms straight UP like a Rook! 👑⬆️"
        },
        {
          end: "h8",
          narration: "The Queen slides diagonally UP-RIGHT like a Bishop! 👑↗️"
        },
        {
          end: "h4",
          narration: "She zooms straight RIGHT! 👑➡️ Super fast!"
        },
        {
          end: "g1",
          narration: "She slides diagonally DOWN-RIGHT! 👑↘️"
        },
        {
          end: "d1",
          narration: "She zooms straight DOWN! 👑⬇️"
        },
        {
          end: "a1",
          narration: "She slides diagonally DOWN-LEFT! 👑↙"
        },
        {
          end: "a4",
          narration: "She zooms straight LEFT! 👑⬅️"
        },
        {
          end: "a7",
          narration: "She slides diagonally UP-LEFT! 👑↖️ She can do it all!"
        }
      ]
    },
    king: {
      name: "King",
      start: "e4",
      iconColor: "#BD10E0",
      emoji: "👑❤️",
      paths: [
        {
          end: "e5",
          narration: "The King takes one careful step UP! 👑"
        },
        {
          end: "f5",
          narration: "One step diagonally UP-RIGHT! 👑"
        },
        {
          end: "f4",
          narration: "One step to the RIGHT! 👑"
        },
        {
          end: "f3",
          narration: "One step diagonally DOWN-RIGHT! 👑"
        },
        {
          end: "e3",
          narration: "One step straight DOWN! 👑"
        },
        {
          end: "d3",
          narration: "One step diagonally DOWN-LEFT! 👑"
        },
        {
          end: "d4", // back to center or relative step
          end: "d4"
        },
        {
          end: "d5",
          narration: "One step diagonally UP-LEFT! 👑 The King is safe and slow!"
        }
      ]
    }
  };

  // Adjust Knight paths to be clean and unique
  pieceConfigs.knight.paths = [
    { end: "f6", narration: "Jumping Knight! 2 squares UP, and 1 square RIGHT! L-Shape! 🐴✨" },
    { end: "g5", narration: "Leap! 1 square UP, and 2 squares RIGHT! Look at him jump! 🐴✨" },
    { end: "g3", narration: "Wheee! 1 square DOWN, and 2 squares RIGHT! Over the fence! 🐴✨" },
    { end: "f2", narration: "Yeehaw! 2 squares DOWN, and 1 square RIGHT! Gallop, gallop! 🐴✨" },
    { end: "d2", narration: "Soft landing! 2 squares DOWN, and 1 square LEFT! 🐴✨" },
    { end: "c3", narration: "Hop, hop, turn! 1 square DOWN, and 2 squares LEFT! 🐴✨" },
    { end: "c5", narration: "Horse power! 2 squares UP, and 1 square LEFT! 🐴✨" },
    { end: "d6", narration: "Up and away! 2 squares UP, and 1 square LEFT! 🐴✨" }
  ];

  // Adjust King paths to be clean and unique
  pieceConfigs.king.paths = [
    { end: "e5", narration: "The King takes one careful step UP! 👑" },
    { end: "f5", narration: "One step diagonally UP-RIGHT! 👑" },
    { end: "f4", narration: "One step to the RIGHT! 👑" },
    { end: "f3", narration: "One step diagonally DOWN-RIGHT! 👑" },
    { end: "e3", narration: "One step straight DOWN! 👑" },
    { end: "d3", narration: "One step diagonally DOWN-LEFT! 👑" },
    { end: "d4", narration: "One step to the LEFT! 👑" },
    { end: "d5", narration: "One step diagonally UP-LEFT! 👑 The King is safe and slow!" }
  ];

  // --- Board Coordinate Helpers ---
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1']; // Top-down

  function coordToIndices(coord) {
    const file = coord[0];
    const rank = coord[1];
    return {
      col: files.indexOf(file),
      row: ranks.indexOf(rank)
    };
  }

  // Calculate center coordinate in terms of percentage (0-100) inside the chessboard
  function getSquareCenterPercent(coord) {
    const { col, row } = coordToIndices(coord);
    return {
      x: col * 12.5 + 6.25,
      y: row * 12.5 + 6.25
    };
  }

  // --- Initialize DOM Elements ---
  const chessBoard = document.getElementById('chess-board');
  const boardModal = document.getElementById('board-modal');
  const modalClose = document.getElementById('modal-close');
  const infoPieceName = document.getElementById('info-piece-name');
  const infoPieceIconContainer = document.getElementById('info-piece-icon-container');
  const narrationText = document.getElementById('narration-text');
  const btnReplay = document.getElementById('btn-replay');
  const arrowOverlay = document.getElementById('arrow-overlay');

  let activePiece = null;
  let activePieceConfig = null;
  let currentPathIndex = 0;
  let animationTimeout = null;
  let animSpeedMultiplier = 1.5; // Default "Slow" speed factor (time in seconds)

  // --- Dynamic Chessboard Generation ---
  function generateBoard() {
    chessBoard.innerHTML = '';
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const square = document.createElement('div');
        const isLight = (r + c) % 2 === 0;
        square.className = `square ${isLight ? 'light' : 'dark'}`;
        square.id = `sq-${files[c]}${ranks[r]}`;
        
        // Add coordinate labels for visual aids (subtle)
        if (c === 0) {
          const rankLabel = document.createElement('span');
          rankLabel.className = 'coord-label rank-label';
          rankLabel.innerText = ranks[r];
          square.appendChild(rankLabel);
        }
        if (r === 7) {
          const fileLabel = document.createElement('span');
          fileLabel.className = 'coord-label file-label';
          fileLabel.innerText = files[c];
          square.appendChild(fileLabel);
        }
        
        chessBoard.appendChild(square);
      }
    }
  }

  generateBoard();

  // --- Board Piece Manipulation ---
  let boardPieceElement = null;

  function createBoardPiece(pieceType) {
    if (boardPieceElement) {
      boardPieceElement.remove();
    }
    
    // Find matching SVG in index.html cards and clone it
    const cardSvg = document.querySelector(`.piece-card[data-piece="${pieceType}"] .svg-icon`);
    if (!cardSvg) return;

    boardPieceElement = document.createElement('div');
    boardPieceElement.className = 'board-piece';
    boardPieceElement.style.position = 'absolute';
    boardPieceElement.style.width = '12.5%';
    boardPieceElement.style.height = '12.5%';
    
    const clone = cardSvg.cloneNode(true);
    boardPieceElement.appendChild(clone);
    chessBoard.appendChild(boardPieceElement);
  }

  function setPiecePosition(coord, instant = false) {
    if (!boardPieceElement) return;
    const { col, row } = coordToIndices(coord);
    
    // Clear custom jump translations/classes
    boardPieceElement.className = 'board-piece';
    boardPieceElement.style.transform = '';
    
    if (instant) {
      boardPieceElement.style.transition = 'none';
    } else {
      // Scale slide animation speed by user configuration
      boardPieceElement.style.transition = `transform ${1.2 / 1.5 * animSpeedMultiplier}s cubic-bezier(0.4, 0, 0.2, 1)`;
    }

    boardPieceElement.style.left = `${col * 12.5}%`;
    boardPieceElement.style.top = `${row * 12.5}%`;
    
    // Force DOM reflow to apply instant positional changes
    if (instant) {
      boardPieceElement.offsetHeight;
    }
  }

  // --- Arrow Drawing Helper ---
  function drawArrow(startCoord, endCoord, isKnight = false) {
    // Clear existing paths in overlay
    const existingPaths = arrowOverlay.querySelectorAll('.movement-path');
    existingPaths.forEach(p => p.remove());

    const start = getSquareCenterPercent(startCoord);
    const end = getSquareCenterPercent(endCoord);
    const pieceType = activePiece;
    const strokeColor = activePieceConfig.iconColor;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'movement-path');
    path.setAttribute('stroke', strokeColor);
    path.setAttribute('marker-end', `url(#arrowhead-${pieceType})`);

    let dAttr = '';
    
    if (isKnight) {
      // Draw an L-shaped path for the Knight (vertical first, then horizontal)
      const startIndices = coordToIndices(startCoord);
      const endIndices = coordToIndices(endCoord);
      
      const elbowX = start.x;
      const elbowY = end.y; // horizontal then vertical or vertical then horizontal

      // Let's decide path style based on distance:
      // If we move 2 vertically and 1 horizontally: draw vertical then horizontal
      // If we move 1 vertically and 2 horizontally: draw horizontal then vertical
      const dRow = Math.abs(endIndices.row - startIndices.row);
      const dCol = Math.abs(endIndices.col - startIndices.col);

      if (dRow === 2) {
        // Vertical first
        dAttr = `M ${start.x} ${start.y} L ${start.x} ${end.y} L ${end.x} ${end.y}`;
      } else {
        // Horizontal first
        dAttr = `M ${start.x} ${start.y} L ${end.x} ${start.y} L ${end.x} ${end.y}`;
      }
    } else {
      // Linear path
      dAttr = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    }

    path.setAttribute('d', dAttr);
    arrowOverlay.appendChild(path);

    // Apply drawing animation length dynamically
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;
    
    // Adjust speed according to kids speed config
    const animDuration = 1.6 / 1.5 * animSpeedMultiplier;
    path.style.animation = `draw-arrow ${animDuration}s forwards linear`;

    return animDuration * 1000; // Return animation duration in ms
  }

  // --- Highlights ---
  function highlightSquare(coord, type = 'start') {
    // Remove existing highlights
    const highlights = chessBoard.querySelectorAll('.square-highlight');
    if (type === 'start') {
      highlights.forEach(h => h.remove());
    }

    const targetSq = document.getElementById(`sq-${coord}`);
    if (targetSq) {
      const highlight = document.createElement('div');
      highlight.className = 'square-highlight';
      highlight.style.backgroundColor = activePieceConfig.iconColor;
      targetSq.appendChild(highlight);
    }
  }

  // --- Main Animation Logic ---
  function runMovementStep() {
    if (!activePieceConfig) return;
    
    // Stop any pending triggers
    clearTimeout(animationTimeout);

    const startCoord = activePieceConfig.start;
    const pathInfo = activePieceConfig.paths[currentPathIndex];
    const endCoord = pathInfo.end;

    // Reset Piece to starting square instantly
    setPiecePosition(startCoord, true);
    highlightSquare(startCoord, 'start');
    
    // Reset message
    narrationText.innerText = `Get ready... Here is the ${activePieceConfig.name}! 🌟`;

    // Step 1: Draw Arrow
    const isKnight = activePieceConfig.isKnight || false;
    
    // Small buffer before starting arrow
    animationTimeout = setTimeout(() => {
      const arrowDuration = drawArrow(startCoord, endCoord, isKnight);
      narrationText.innerText = pathInfo.narration || `The ${activePieceConfig.name} moves to ${endCoord.toUpperCase()}!`;
      highlightSquare(endCoord, 'end');

      // Step 2: Animate Chess Piece movement after arrow finishes drawing
      animationTimeout = setTimeout(() => {
        if (isKnight) {
          // Perform Knight Hop
          const startIdx = coordToIndices(startCoord);
          const endIdx = coordToIndices(endCoord);
          
          // Calculate translations in percentages
          const dx100 = (endIdx.col - startIdx.col) * 12.5;
          const dy100 = (endIdx.row - startIdx.row) * 12.5;
          
          // Peak jump offsets
          const dx50 = dx100 / 2;
          const dy50 = (dy100 / 2) - 15; // Jumps 15% height up

          boardPieceElement.style.setProperty('--dx50', `${dx50}%`);
          boardPieceElement.style.setProperty('--dy50', `${dy50}%`);
          boardPieceElement.style.setProperty('--dx100', `${dx100}%`);
          boardPieceElement.style.setProperty('--dy100', `${dy100}%`);
          
          // Apply custom speed to jump keyframe
          const jumpSpeed = 1.2 / 1.5 * animSpeedMultiplier;
          boardPieceElement.style.animation = `knight-hop ${jumpSpeed}s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
          boardPieceElement.classList.add('knight-hop-animation');
        } else {
          // Slide translation
          const startIdx = coordToIndices(startCoord);
          const endIdx = coordToIndices(endCoord);
          const dx = (endIdx.col - startIdx.col) * 100;
          const dy = (endIdx.row - startIdx.row) * 100;
          
          boardPieceElement.style.transform = `translate(${dx}%, ${dy}%)`;
        }

        // Step 3: Wait for move to finish, pause, then loop
        const moveTime = 1200 / 1.5 * animSpeedMultiplier;
        animationTimeout = setTimeout(() => {
          // Celebration text or final step highlight
          
          // Wait 2.5 seconds at destination before going to the next step
          animationTimeout = setTimeout(() => {
            currentPathIndex = (currentPathIndex + 1) % activePieceConfig.paths.length;
            runMovementStep();
          }, 2500);

        }, moveTime);

      }, arrowDuration - 100); // Trigger move slightly before arrow fully completes for continuity

    }, 800);
  }

  // --- Modal Controllers ---
  function openMovementDemo(pieceType) {
    activePiece = pieceType;
    activePieceConfig = pieceConfigs[pieceType];
    currentPathIndex = 0;

    // Set Modal texts
    infoPieceName.innerText = activePieceConfig.name;
    
    // Copy visual icon
    infoPieceIconContainer.innerHTML = '';
    const cardSvg = document.querySelector(`.piece-card[data-piece="${pieceType}"] .svg-icon`).cloneNode(true);
    infoPieceIconContainer.appendChild(cardSvg);

    // Show Board Piece
    createBoardPiece(pieceType);

    // Open Modal
    boardModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling

    // Run first step
    runMovementStep();
  }

  function closeMovementDemo() {
    clearTimeout(animationTimeout);
    boardModal.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scroll
    
    // Clean elements
    if (boardPieceElement) {
      boardPieceElement.remove();
      boardPieceElement = null;
    }
    const existingPaths = arrowOverlay.querySelectorAll('.movement-path');
    existingPaths.forEach(p => p.remove());
    const highlights = chessBoard.querySelectorAll('.square-highlight');
    highlights.forEach(h => h.remove());
  }

  // --- Event Listeners ---
  document.querySelectorAll('.piece-card').forEach(card => {
    const btn = card.querySelector('.btn-move');
    const piece = card.getAttribute('data-piece');
    
    btn.addEventListener('click', () => {
      openMovementDemo(piece);
    });
  });

  modalClose.addEventListener('click', closeMovementDemo);
  
  // Close modal when clicking backdrop
  boardModal.addEventListener('click', (e) => {
    if (e.target === boardModal) {
      closeMovementDemo();
    }
  });

  // Replay Button
  btnReplay.addEventListener('click', () => {
    // Reset active path index and rerun
    runMovementStep();
  });

  // Speed selection
  document.querySelectorAll('.btn-speed').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-speed').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      animSpeedMultiplier = parseFloat(e.target.getAttribute('data-speed'));
      
      // Immediately replay with new speed
      runMovementStep();
    });
  });
});
