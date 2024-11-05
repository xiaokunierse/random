document.addEventListener("DOMContentLoaded", () => {
    const seatGroups = document.querySelectorAll('.seats');
    const randomCountSelect = document.getElementById('random-count');
    const startButton = document.getElementById('start-random');
    const resultsDiv = document.getElementById('results');



    // 创建座位
    const createSeats = () => {
        seatGroups.forEach(group => {
            for (let i = 1; i <= 21; i++) {
                const seat = document.createElement('div');
                seat.classList.add('seat');
                seat.textContent = `座位 ${i}`;
                group.appendChild(seat);
            }
        });
    };

    // 排除座位的索引
    const excludedSeats = [
        (2 * 21) + 4,  // zhushaokun
        (2 * 21) + 0,  // zhaoyanlong
        (1 * 21) + 16  // zhangzhihao
    ];


    // 随机选择座位
    const randomSelect = () => {
        const N = parseInt(randomCountSelect.value);
        const allSeats = document.querySelectorAll('.seat');
        const previousHighlights = document.querySelectorAll('.highlight');

        // 清空上次的随机结果
        previousHighlights.forEach(seat => {
            seat.classList.remove('highlight');
        });

        const selectedSeats = [];

        while (selectedSeats.length < N) {
            const randomIndex = Math.floor(Math.random() * allSeats.length);

            // 排除已选座位以及排除的特定座位
            if (!selectedSeats.includes(allSeats[randomIndex]) && !excludedSeats.includes(randomIndex)) {
                selectedSeats.push(allSeats[randomIndex]);
            }
        }

        // 为随机选择的座位添加高亮
        selectedSeats.forEach(seat => {
            seat.classList.add('highlight');
        });
        // 为排除座位添加动画效果
        excludedSeats.forEach(index => {
            const excludedSeat = allSeats[index];
            excludedSeat.classList.add('excluded');  // 添加排除样式
        });

        resultsDiv.innerHTML = '随机结果: ' + selectedSeats.map(seat => seat.textContent).join(', ');
    };

    startButton.addEventListener('click', () => {
        resultsDiv.innerHTML = '';

        const duration = 2400;
        const interval = 100;
        const iterations = duration / interval;
        let count = 0;

        const intervalId = setInterval(() => {
            randomSelect();
            count++;

            // 模拟动画循环，确保最终执行一次随机选择
            if (count >= iterations) {
                clearInterval(intervalId);
                randomSelect(); // 最终选择
            }
        }, interval);
    });

    // 创建座位
    createSeats();
});
