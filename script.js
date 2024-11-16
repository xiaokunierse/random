document.addEventListener("DOMContentLoaded", () => {
    const seatGroups = document.querySelectorAll('.seats');
    const randomCountSelect = document.getElementById('random-count');
    const startButton = document.getElementById('start-random');
    const resultsDiv = document.getElementById('results');

    // 排除座位的索引
    const excludedSeats = [
        (0 * 21) + 0,
        (0 * 21) + 1,
        (0 * 21) + 2,
        (2 * 21) + 0,
        (2 * 21) + 1,
        (2 * 21) + 2,
    ];

    // 标记是否是最终选择
    let isFinalSelection = false;

    // 创建座位
    const createSeats = () => {
        seatGroups.forEach((group, groupIndex) => {
            for (let i = 1; i <= 21; i++) {
                const seatIndex = (groupIndex * 21) + (i - 1);
                const seat = document.createElement('div');
                seat.classList.add('seat');
                seat.textContent = `座位 ${i}`;
                if (excludedSeats.includes(seatIndex)) {
                    seat.classList.add('excluded');
                }
                group.appendChild(seat);
            }
        });
    };

    // 随机选择座位
    const randomSelect = () => {
        const N = parseInt(randomCountSelect.value);
        const allSeats = Array.from(document.querySelectorAll('.seat')); // 将所有座位转为数组以便索引
        const previousHighlights = document.querySelectorAll('.highlight');

        // 清空上次的随机结果
        previousHighlights.forEach(seat => seat.classList.remove('highlight'));

        const selectedSeats = [];
        const excludedSeatsSet = new Set(excludedSeats); // 使用 Set 进行快速查找

        // 为排除座位添加动画效果
        excludedSeats.forEach(index => {
            const excludedSeat = allSeats[index];
            excludedSeat.classList.add('excluded');  // 添加排除样式
        });

        while (selectedSeats.length < N) {
            const randomIndex = Math.floor(Math.random() * allSeats.length);

            // 排除已选座位以及排除的特定座位
            if (!selectedSeats.includes(allSeats[randomIndex]) && !excludedSeatsSet.has(randomIndex)) {
                selectedSeats.push(allSeats[randomIndex]);
            }
        }

        // 为随机选择的座位添加高亮
        selectedSeats.forEach(seat => seat.classList.add('highlight'));

        resultsDiv.innerHTML = '随机结果: ' + selectedSeats.map(seat => seat.textContent).join(', ');

        // 如果是最终选择，将本次选中的座位索引添加到排除座位数组中
        if (isFinalSelection) {
            selectedSeats.forEach(seat => {
                const seatIndex = allSeats.indexOf(seat);
                if (!excludedSeatsSet.has(seatIndex)) {
                    excludedSeats.push(seatIndex);
                    excludedSeatsSet.add(seatIndex); // 确保重复排除
                }
            });
        }
    };

    // 启动按钮点击事件
    startButton.addEventListener('click', () => {
        if (startButton.disabled) return;  // 防止重复点击

        // 禁用按钮
        startButton.disabled = true;
        resultsDiv.innerHTML = '';

        const duration = 1800;
        const interval = 120;
        const iterations = duration / interval;
        let count = 0;
        isFinalSelection = false;

        // 动画循环
        const intervalId = setInterval(() => {
            randomSelect();
            count++;

            // 模拟动画循环，确保最终执行一次随机选择
            if (count >= iterations) {
                clearInterval(intervalId);
                isFinalSelection = true;
                randomSelect(); // 最终选择
                startButton.disabled = false;  // 动画结束后启用按钮
            }
        }, interval);
    });

    // 创建座位
    createSeats();
});
