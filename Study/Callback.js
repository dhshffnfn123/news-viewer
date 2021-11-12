
/* ---------------------------------- 콜백 함수 --------------------------------- */

// 파라미터에 값이 주어지면 1초 뒤에 10을 더해줌
function increase(number, callback) {
    setTimeout(() => {
        const result = number + 10;
        if (callback) {
            callback(result);
        }
    }, 1000)
}

increase(0, result => {
    console.log(result);
});

// 1초에 걸쳐서 10 20 30 40과 같은 형태로 여러번 순차적으로 처리하고 싶다면 콜백함수를 중첩하여 구현할 수 있다
function increase2(number, callback) {
    setTimeout(() => {
        const result = number + 10;
        if (callback) {
            callback(result);
        }
    }, 1000);
}

console.log('작업 시작');
increase(0, result => {
    console.log(result);
    increase(result, result => {
        console.log(result);
    })//...
})

// 다음과 같은 경우는 코드의 가독성이 나빠지므로 이러한 형태의 코드를 '콜백 지옥' 이라고 한다.

/* --------------------------------- Promise -------------------------------- */
function increase3(number) {
    const promise = new Promise((resolve, reject) => {
        //resolve는 성공, reject는 실패
        setTimeout(() => {
            const result = number + 10;
            if (result > 50) {
                // 50보다 높으면 에러 발생시키기
                const e = new Error('NumberTooBig');
                return reject(e);
            }
            resolve(result); // number 값에 +10 후 성공 처리
        }, 1000);
    })
    return promise;
}

increase3(0)
    .then(number => {
        // Promise에서 resolve된 값은 .then을 통해 받아올 수 있음
        console.log(number);
        return increase3(number); // Promise를 리턴하면
    })
    .then(number => {
        // 또 .then으로 처리 가능
        console.log(number);
        return increase3(number);
    })
    .then(number => {
        console.log(number);
        return increase3(number);
    })
    .then(number => {
        console.log(number);
        return increase3(number);
    })
    .then(number => {
        console.log(number);
        return increase3(number);
    })
    .catch(e => {
        // 도중에 에러가 발생한다면 .catch를 통해 알 수 있음
        console.log(e);
    })


    /* ------------------------------- async/await ------------------------------ */
    // 함수의 앞부분에 async 키워드를 추가하고, 해당 함수 내부에서 Promise의 앞부분에 await 키워드를 사용한다.

    function increase4(number) {
        const promise = new Promise((resolve, reject) => {
            // resolve는 성공, reject는 실패
            setTimeout(() => {
                const result = number + 10;
                if (result > 50) { // 50보다 높으면 에러 발생시키기
                    const e = new Error("NumberTooBig");
                    return reject(e);
                }
                resolve(result); // number 값에 + 10 후 성공 처리
            }, 1000)
        });
        return promise;
    }

    async function runTasks() {
        try { // try/catch 구문을 사용하여 에러를 처리한다.
            let result = await increase4(0);
            console.log(result);
            result = await increase4(result);
            console.log(result);
            result = await increase4(result);
            console.log(result);
            result = await increase4(result);
            console.log(result);
            result = await increase4(result);
            console.log(result);
        } catch (e) {
            console.log(e); // NumberTooBig
        }
    }