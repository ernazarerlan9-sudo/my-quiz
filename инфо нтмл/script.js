// 1) Басты беттегі мәтін теру эффектісі
const typed = document.getElementById('typed');
if (typed) {
  const text = 'Жасанды интеллект — адамның ойлау қабілетін қайталауға тырысатын компьютерлік жүйелер. Олар деректерден үйреніп, есептерді өздері шешеді.';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typed.textContent = text;
  } else {
    let n = 0;
    const id = setInterval(() => {
      typed.textContent = text.slice(0, ++n);
      if (n >= text.length) clearInterval(id);
    }, 28);
  }
}

// 2) Тест беті
const box = document.getElementById('quiz');
if (box) {
  const Q = [
    { q: '«Жасанды интеллект» термині қай жылы пайда болды?', o: ['1943', '1956', '1997', '2022'], a: 1 },
    { q: 'Компьютердің мысалдардан үйрену тәсілі қалай аталады?', o: ['Машиналық оқыту', 'Дефрагментация', 'Мәтін өңдеу', 'Желілік маршрут'], a: 0 },
    { q: '1997 жылы шахматта Каспаровты кім жеңді?', o: ['AlphaGo', 'ChatGPT', 'Deep Blue', 'Siri'], a: 2 },
    { q: 'ИИ жауап берсе, не істеу керек?', o: ['Бәріне сену', 'Басқа дереккөзден тексеру', 'Мән бермеу', 'Бірден жіберу'], a: 1 }
  ];
  let i = 0, score = 0;

  function show() {
    const q = Q[i];
    box.innerHTML = '';
    const h = document.createElement('h2');
    h.textContent = (i + 1) + ' / ' + Q.length + '. ' + q.q;
    box.append(h);
    q.o.forEach((t, k) => {
      const b = document.createElement('button');
      b.className = 'opt';
      b.textContent = t;
      b.onclick = () => pick(k, b);
      box.append(b);
    });
  }

  function pick(k, b) {
    const q = Q[i];
    box.querySelectorAll('.opt').forEach((x, j) => {
      x.disabled = true;
      if (j === q.a) x.classList.add('ok');
    });
    if (k === q.a) score++; else b.classList.add('bad');
    const n = document.createElement('button');
    n.className = 'next';
    n.textContent = i < Q.length - 1 ? 'Келесі сұрақ' : 'Нәтижені көру';
    n.onclick = () => { i++; i < Q.length ? show() : end(); };
    box.append(n);
    n.focus();
  }

  function end() {
    box.innerHTML = '<h2>Нәтиже: ' + score + ' / ' + Q.length + '</h2>';
    const b = document.createElement('button');
    b.className = 'next';
    b.textContent = 'Қайта бастау';
    b.onclick = () => { i = 0; score = 0; show(); };
    box.append(b);
  }
  show();
}
ы