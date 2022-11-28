const texts = [
    'We cannot hear you', 'Can you hear me?', 'I hear background noise',
    'I\'m late', 'Need to run to next meeting', 'Is ... here?',
    'Can you see my screen?', 'Who can share the screen?', 'Let me share my screen',
    'Seems we lost ...', 'Connection issues', 'Can you repeat please?',
    'Any blockers?', 'Tomorrow I will have day off', 'Who can help me with this problem?',
    'Next can go ...', 'Is boarding complete?', 'Let\'s close the call',
    'We are running late', 'No updates from my side', 'Please mute yourself',
    'We need to speed-up a bit', 'Still working on ...', 'Let\'s discuss it offline', 'I\'ve sent you a mail',
    'Can everyone go on mute','Next slide, please','Can you email that to everyone','I need to jump in another call',
    'Load painful echo','Hello World'
];


export const getData = (gridSize) => {
    texts.sort((a, b) => 0.5 - Math.random());
    const cards = [];
    let textCount = 0;
    let totalTexts = Math.floor(texts.length/gridSize);
    for(let i=0;i<totalTexts;i++) {
        const cells = [];
        for(let j=0;j<gridSize;j++) {
            const cell = {
                id: textCount,
                text: texts[textCount++],
                selected: false,
                cellColor: 'bg-white bg-opacity-50',
                clickable: false,
                render: textCount <= gridSize * gridSize
            }
            cells.push(cell);
        }
        cards.push(cells);
    }
    const middleIndex = Math.floor(gridSize/2);
    cards[middleIndex][middleIndex].selected = true;
    cards[middleIndex][middleIndex].cellColor = "bg-info bg-opacity-25";
    cards[middleIndex][middleIndex].text = "Conf call bingo";
    return cards;
}
