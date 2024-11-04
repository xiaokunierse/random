document.addEventListener("DOMContentLoaded", () => {
    const seatGroups = document.querySelectorAll('.seats');
    const randomCountSelect = document.getElementById('random-count');
    const startButton = document.getElementById('start-random');
    const resultsDiv = document.getElementById('results');

 // 创建座位
const createSeats = () => {
    seatGroups.forEach(group => {
        for (let i = 1; i <= 18; i++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            seat.textContent = `座位 ${i}`;
            group.appendChild(seat);
        }
    });
};

// 随机选择座位
const randomSelect = () => {
    const N = parseInt(randomCountSelect.value);
    const allSeats = document.querySelectorAll('.seat');
    const previousHighlights = document.querySelectorAll('.highlight');
    
    // 清空上次的随机结果
    previousHighlights.forEach(seat => {
        seat.classList.remove('highlight');
    });

    // 随机选择N个座位
    const selectedSeats = [];
    const excludedSeatIndex = (2 * 18) + 4; // 第三组的座位5的索引

    while (selectedSeats.length < N) {
        const randomIndex = Math.floor(Math.random() * allSeats.length);
        // 确保随机选择的座位不是第三组的座位5
        if (!selectedSeats.includes(allSeats[randomIndex]) && randomIndex !== excludedSeatIndex) {
            selectedSeats.push(allSeats[randomIndex]);
        }
    }

    // 动画效果
    selectedSeats.forEach(seat => {
        seat.classList.add('highlight');
    });

    // 显示结果
    resultsDiv.innerHTML = '随机结果: ' + selectedSeats.map(seat => seat.textContent).join(', ');
};

    startButton.addEventListener('click', () => {
        resultsDiv.innerHTML = '';
        // 3秒动画
        const duration = 3000;
        const interval = 100;
        const iterations = duration / interval;
        let count = 0;

        const intervalId = setInterval(() => {
            randomSelect();
            count++;
            if (count >= iterations) {
                clearInterval(intervalId);
                randomSelect(); // 最终选择
            }
        }, interval);
    });

    createSeats();
});
