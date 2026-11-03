// 寄存处 · 一个小游戏
// 全部剧本 + 引擎都在这一个文件里，双击 index.html 就能玩。

const STORY = {

  /* ── 接班之前 ── */
  s0: { bg: 'room', day: '接班', who: '', text: '接班之前，先说清楚。' },
  s1: { bg: 'room', day: '接班', who: '', text: '你值的是凌晨三点的班。\n一道铁门，一间值班室，一本记录本。' },
  s2: { bg: 'room', day: '接班', who: '', text: '记录本上，每一班只能写一行。' },
  s3: { bg: 'room', day: '接班', who: '', text: '五点交班，交的是这本子。' },
  s4: { bg: 'room', day: '接班', who: '', text: '夜里会有人来。\n你不出门，那个人就会死。\n你只有两次出门的机会。' },
  s5: { bg: 'room', day: '接班', who: '', text: '你只有一个人。' },
  s6: { bg: 'room', day: '03:00', who: '', text: '三点整。雨。', next: 'a1' },

  /* ── 老太太 ── */
  a1: { bg: 'gate', day: '03:00', who: '', text: '门铃响了。' },
  a2: { bg: 'oldwoman', day: '03:00', who: '', text: '一个老太太站在铁门外，打着一把断了骨的伞。' },
  a3: { bg: 'oldwoman', day: '03:00', who: '老太太', text: '我找我儿子。三单元，二〇二。' },
  a4: { bg: 'room', day: '03:00', who: '', text: '你翻开登记本。\n二〇二那一户，十年前就搬走了。', ledger: '记录本\n03:00 接班\n（还没写）' },
  a5: {
    bg: 'oldwoman', day: '03:00', who: '', text: '她还在按铃。隔一会儿按一下。',
    choices: [
      { label: '隔着门告诉她，二〇二没人住了', next: 'a_tell', do: (s) => { s.toldOld = true; } },
      { label: '开门，让她进来躲雨（出门）', next: 'a_in', if: (s) => s.outings > 0, do: (s) => { s.letOld = true; s.outings--; } },
      { label: '把窗关上，当没听见', next: 'a_ignore' }
    ]
  },
  a_tell: { bg: 'oldwoman', day: '03:00', who: '你', text: '二〇二没人住了。十年前就搬走了。' },
  a_tell2: { bg: 'oldwoman', day: '03:00', who: '', text: '她哦了一声，没走。\n伞还是歪的。', tick: 1, next: 'b1' },
  a_in: { bg: 'room', day: '03:00', who: '', text: '门开了。她收伞的时候，水淌了一地。' },
  a_in2: { bg: 'room', day: '03:00', who: '老太太', text: '他小时候怕打雷。一到下雨就往我怀里钻。' },
  a_in3: { bg: 'room', day: '03:00', who: '', text: '她坐下了。\n你的椅子只有一把。', tick: 1, next: 'b1' },
  a_ignore: { bg: 'room', day: '03:00', who: '', text: '你把窗关上了。' },
  a_ignore2: { bg: 'room', day: '03:00', who: '', text: '门铃又响了七次。\n然后就不响了。', tick: 1, next: 'b1' },

  /* ── 女人 ── */
  b1: { bg: 'woman', day: '03:20', who: '', text: '雨更大了。' },
  b2: { bg: 'woman', day: '03:20', who: '', text: '一个女人从巷子里跑出来，站在门口，不按铃。' },
  b3: { bg: 'woman', day: '03:20', who: '', text: '她手背上有血。外套是别人的，大两号。\n开口的时候，是外地口音。' },
  b4: { bg: 'woman', day: '03:20', who: '女人', text: '我能借一下电话吗。' },
  b5: {
    bg: 'room', day: '03:20', who: '', text: '电话在桌上。你只要把它推出去。',
    choices: [
      { label: '把电话从窗口推给她', next: 'b_phone', do: (s) => { s.helpedWoman = true; } },
      { label: '开门，让她进来打（出门）', next: 'b_in', if: (s) => s.outings > 0, do: (s) => { s.helpedWoman = true; s.womanIn = true; s.outings--; } },
      { label: '说派出所往东两百米', next: 'b_police' }
    ]
  },
  b_phone: { bg: 'room', day: '03:20', who: '', text: '她接过电话，背对着你说话。\n声音很小，一句没听清。' },
  b_phone2: { bg: 'room', day: '03:20', who: '', text: '她挂断，把电话从窗口推回来。\n「谢谢。」她说完就跑了。', tick: 1, next: 'c1' },
  b_in: { bg: 'room', day: '03:20', who: '', text: '她进来了，靠着墙打。\n说的是老家话，你只听见「我没事」。' },
  b_in2: { bg: 'room', day: '03:20', who: '', text: '她打完没走，坐在台阶上等雨停。', tick: 1, next: 'c1' },
  b_police: { bg: 'woman', day: '03:20', who: '', text: '她看了你一会儿，说：「行。」' },
  b_police2: { bg: 'woman', day: '03:20', who: '', text: '她往东走了。\n走出去十几步，又回头看了一次。', tick: 1, next: 'c1' },

  /* ── 醉汉 ── */
  c1: { bg: 'drunk', day: '03:40', who: '', text: '台阶上坐着个人。' },
  c2: { bg: 'drunk', day: '03:40', who: '', text: '不知道什么时候来的。一身酒气，不闹，也不敲门。\n就是不走。\n他口袋里的手机一直在响，屏幕亮起来的时候，上面写着「妈」。' },
  c3: {
    bg: 'drunk', day: '03:40', who: '', text: '雨落在他身上，他像没感觉。',
    choices: [
      { label: '出去赶他走（出门）', next: 'c_out', if: (s) => s.outings > 0, do: (s) => { s.outings--; s.chased = true; } },
      { label: '倒杯热水端出去（出门）', next: 'c_water', if: (s) => s.outings > 0, do: (s) => { s.water = true; s.outings--; } },
      { label: '拉上窗帘', next: 'c_curtain' }
    ]
  },
  c_out: { bg: 'gate', day: '03:40', who: '你', text: '这儿不能坐。' },
  c_out2: { bg: 'drunk', day: '03:40', who: '', text: '他抬头看你，眼睛是红的。\n然后站起来，走进雨里。', tick: 1, next: 'd1' },
  c_water: { bg: 'drunk', day: '03:40', who: '', text: '你把水放在他手边，没说话。' },
  c_water2: { bg: 'drunk', day: '03:40', who: '', text: '他捧着杯子，很久才喝一口。\n「谢谢。」他说得很清楚，一点也不像醉的。\n电话又响了。他接了，说：「妈，我在门口呢，马上上来。」\n然后他挂了，继续坐着。', tick: 1, next: 'd1' },
  c_curtain: { bg: 'room', day: '03:40', who: '', text: '你拉上了窗帘。' },
  c_curtain2: { bg: 'drunk', day: '03:40', who: '', text: '十分钟后，外面有瓶子摔碎的声音。\n然后没有了。', tick: 1, next: 'd1' },

  /* ── 站着的人 ── */
  d1: { bg: 'standing', day: '04:00', who: '', text: '雨里站着一个人。' },
  d2: { bg: 'standing', day: '04:00', who: '', text: '没打伞。不看门铃，也不看窗户。\n他看着铁门。\n手里拎着两袋东西：一袋药，一袋橘子。' },
  d3: {
    bg: 'standing', day: '04:00', who: '', text: '他在那儿站了至少十分钟。',
    choices: [
      { label: '打手电出去问他（出门）', next: 'd_ask', if: (s) => s.outings > 0, do: (s) => { s.askedMan = true; s.outings--; } },
      { label: '隔着窗看他', next: 'd_watch' },
      { label: '把灯关了', next: 'd_dark' }
    ]
  },
  d_ask: { bg: 'gate', day: '04:00', who: '你', text: '你找谁。' },
  d_ask2: { bg: 'standing', day: '04:00', who: '', text: '他转过头。' },
  d_ask3: { bg: 'gate', day: '04:00', who: '男人', text: '我等人开门。约了六点。' },
  d_ask4: { bg: 'standing', day: '04:00', who: '', text: '他说完，又转回去看门。\n你等了一会儿，他没再说话。', tick: 1, next: 'x1' },
  d_watch: { bg: 'room', day: '04:00', who: '', text: '你隔着玻璃看他。' },
  d_watch2: { bg: 'standing', day: '04:00', who: '', text: '四点二十，他抬手看了一眼表。\n然后继续站着。', tick: 1, next: 'x1' },
  d_dark: { bg: 'room', day: '04:00', who: '', text: '你关了灯。' },
  d_dark2: { bg: 'standing', day: '04:00', who: '', text: '黑暗里，铁门那边一点声音都没有。', tick: 1, next: 'x1' },


  /* ── 天亮前走一圈：四个人各自的交代 ── */
  g0: { bg: 'dawn', day: '04:50', who: '', text: '四点五十。你拿起手电，出门走一圈。' },
  g1: { bg: 'dawn', day: '04:50', who: '老太太', text: (s) => s.letOld
      ? '她睡在值班室的椅子上，外套盖在身上。\n呼吸很轻。'
      : (s.toldOld
        ? '她还在门外。伞不知道哪儿去了，人靠着铁门。\n听见你的脚步，她说：「我再等一会儿。」'
        : '门口没有人。\n地上有一只鞋印，很浅，被雨冲得快没了。') },
  g2: { bg: 'gate', day: '04:55', who: '', text: (s) => s.helpedWoman
      ? '巷口停着两辆车。\n她坐在其中一辆的后座，隔着雨水看了你一眼，没有招手。'
      : '巷子是空的。\n地上有一小块颜色深的地方，雨已经把它冲开了。\n你想起来，那声瓶子摔碎，是在她跑过这条巷子之后。' },
  g3: { bg: 'gate', day: '04:55', who: '', text: (s) => (s.water || s.womanIn)
      ? '台阶上放着一个空杯子，底下压着一张车票。\n目的地是一个北边的县城。\n跟她说话的口音，是一个方向的。\n人走了。'
      : (s.chased
        ? '台阶是空的。\n你赶他走的方向，是往河边的那条路。'
        : '台阶上有碎玻璃，还有一个没喝完的酒瓶。\n人不知道什么时候走的。') },
  g4: { bg: 'gate', day: '05:00', who: '', text: (s) => s.askedMan
      ? '他还在铁门外站着。\n「我等人开门。」他又说了一遍，好像一夜没动过。'
      : '铁门外没有人。\n门上有一块干了的印子，形状像一只手。' },
  g5: { bg: 'dawn', day: '05:00', who: '', text: '你回到屋里。天已经亮了一半。', next: 'f1' },


  /* ── 四点三十：把外面看一遍 ── */
  x1: { bg: 'room', day: '04:30', who: '', text: '四点三十。雨停了。' },
  x2: { bg: 'room', day: '04:30', who: '', text: '你站在窗前，把外面看了一遍。' },
  x3: { bg: 'gate', day: '04:30', who: '', text: (s) => {
      const a = s.letOld ? '老太太在值班室的椅子上，睡着了。'
        : (s.toldOld ? '老太太还站在门外，伞已经不在手里了。'
          : '门外没有老太太。台阶上有一只被雨泡软的纸袋。');
      const b = s.helpedWoman ? '巷口的车还亮着灯。'
        : '巷子是空的，只有雨水在往下淌。';
      const c = (s.water || s.chased) ? '台阶上的醉汉不在了。'
        : '醉汉还在台阶上坐着，手机又亮了。';
      const d = s.askedMan ? '铁门外，那个人还站着。' : '铁门外没有人。';
      return [a, b, c, d].join('\n');
    } },
  x4: { bg: 'room', day: '04:30', who: '', text: '你数了一遍：四个人。' },
  x5: { bg: 'room', day: '04:30', who: '', text: '你能管的，只有两个。', tick: 1, next: 'e0' },

  /* ── 写记录 ── */
  e0: { bg: 'room', day: '04:40', who: '', text: '四点四十。', next: 'e1' },
  e1: { bg: 'room', day: '04:40', who: '', text: '四点四十。雨小了。' },
  e2: { bg: 'room', day: '04:40', who: '', text: '该写记录了。' },
  e3: { bg: 'room', day: '04:40', who: '', text: '一行。', ledger: '记录本\n03:00 接班\n（空着）' },
  e4: {
    bg: 'room', day: '04:40', who: '', text: '笔在手里。',
    choices: [
      { label: '写：二〇二的老太太一直在门口等儿子', next: 'w_a', do: (s) => { s.wrote = 'a'; } },
      { label: '写：巷口来的女人手上有伤，已答应帮她报警', next: 'w_b', do: (s) => { s.wrote = 'b'; } },
      { label: '写：一切正常', next: 'w_c', do: (s) => { s.wrote = 'c'; } }
    ]
  },
  w_a: { bg: 'room', day: '04:50', who: '', text: '你写下那一行，写完看了一遍。', next: 'g0' },
  w_b: { bg: 'room', day: '04:50', who: '', text: '你写下那一行，写完看了一遍。', next: 'g0' },
  w_c: { bg: 'room', day: '04:50', who: '', text: '你写：一切正常。四个字。', next: 'g0' },

  /* ── 交班 ── */
  f1: { bg: 'dawn', day: '05:00', who: '', text: '五点。接你班的人来了。' },
  f2: { bg: 'dawn', day: '05:00', who: '', text: '他先看记录本，再看你。' },
  f3: { bg: 'dawn', day: '05:00', who: '', text: '他念了出来——', next: 'branch' }
};

const ENDINGS = {
  a: '「二〇二的老太太一直在门口等儿子。」\n\n他抬头往门外看了一眼。\n她还在，伞已经不知道哪儿去了。\n\n他们打了电话，把她送到救助站。\n\n你回家的时候天已经亮了。\n你妈今年也七十三。',
  b: '「巷口来的女人手上有伤，已答应帮她报警。」\n\n他看了两遍，问：人呢。\n\n人没了。\n\n警车来得很快。巷子里是空的。\n\n记录本上那行字还在。\n人没了，字就成了谎。',
  c: '「一切正常。」\n\n他签了字，什么也没问。\n\n你推开门。\n台阶上是干的。\n\n昨晚那个位置，有一圈还没干的水印。'
};


/* ── 引擎 ── */

const el = (id) => document.getElementById(id);
const stage = el('stage');
const bgA = el('bg-a'), bgB = el('bg-b');
const box = el('box'), who = el('who'), textEl = el('text'), hint = el('hint');
const choicesEl = el('choices'), clockEl = el('clock'), dayEl = el('day');
const ledEl = el('ledger');
const helpEl = el('help');
let helpOpen = false;
function toggleHelp(force) {
  helpOpen = (typeof force === 'boolean') ? force : !helpOpen;
  if (helpEl) helpEl.classList.toggle('on', helpOpen);
}
const titleEl = el('title'), endingEl = el('ending'), endText = el('endtext');

let state = null;
let node = null;
let currentId = null;
let typing = null;
let waitingChoice = false;
let bgOnA = true;
let started = false;

function newState() {
  return { returned: 0, kept: false, took: false, opened: false, spoke: false, clock: 0, outings: 2, wrote: '' };
}

function resetClock() {
  paintClock();
}

function clockText() {
  const total = 180 + state.clock * 20; // 03:00 起，每格 20 分钟
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
}

function paintClock() {
  const hand = document.querySelector('#clockface .hand');
  if (hand) hand.style.transform = 'rotate(' + (-state.clock * 36) + 'deg)';
  const lbl = document.getElementById('clocklabel');
  if (lbl) lbl.textContent = '值班中 ' + clockText() + (state ? ('　还能出门 ' + state.outings + ' 次') : '');
}

let actx = null;
let muted = false;

function playTick() {
  if (muted) return;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    actx = actx || new AC();
    if (actx.state === 'suspended') actx.resume();
    const t = actx.currentTime;

    // 木头似的「笃」：三角波快速下滑 + 快衰减
    const osc = actx.createOscillator();
    const g = actx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(340, t);
    osc.frequency.exponentialRampToValueAtTime(110, t + 0.09);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.30, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.26);
    osc.connect(g).connect(actx.destination);
    osc.start(t);
    osc.stop(t + 0.28);

    // 一点金属外壳的噪声
    const len = Math.floor(actx.sampleRate * 0.06);
    const buf = actx.createBuffer(1, len, actx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    const src = actx.createBufferSource();
    src.buffer = buf;
    const bp = actx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 2100;
    bp.Q.value = 1.1;
    const ng = actx.createGain();
    ng.gain.value = 0.10;
    src.connect(bp).connect(ng).connect(actx.destination);
    src.start(t);
  } catch (e) { /* 没声音也能玩 */ }
}

function tickFx() {
  const stage = document.getElementById('stage');
  const fx = document.getElementById('tickfx');
  if (stage) {
    stage.classList.remove('shake');
    void stage.offsetWidth;
    stage.classList.add('shake');
    setTimeout(function () { stage.classList.remove('shake'); }, 500);
  }
  if (fx) {
    fx.textContent = node && node.tickText ? node.tickText : (clockText() + '\u3000又过去二十分钟');
    fx.classList.add('on');
    setTimeout(function () { fx.classList.remove('on'); }, 1500);
  }
  playTick();
}

const GRAD = {
  dusk: 'radial-gradient(ellipse at 62% 38%, #3a2a1c 0%, #1b140f 45%, #0c0907 100%)',
  night: 'radial-gradient(ellipse at 60% 45%, #20242e 0%, #12141a 45%, #07080b 100%)',
  dawn: 'radial-gradient(ellipse at 50% 30%, #2b3038 0%, #171b22 45%, #0a0c10 100%)'
};

function setBg(name) {
  const url = `assets/${name}.webp`;
  const nextEl = bgOnA ? bgB : bgA;
  nextEl.style.backgroundImage = GRAD[name] || GRAD.night;
  nextEl.style.backgroundSize = 'cover';
  nextEl.style.backgroundPosition = 'center';
  const test = new Image();
  test.onload = () => {
    nextEl.style.backgroundImage = `url("${url}")`;
  };
  test.onerror = () => { /* 没图就用底色 */ };
  test.src = url;
  nextEl.classList.add('on');
  (bgOnA ? bgA : bgB).classList.remove('on');
  bgOnA = !bgOnA;
}

const ORDER = Object.keys(STORY);

function nextOf(id) {
  const n = STORY[id];
  if (!n) return null;
  if (n.choices) return null;
  if (n.next) return n.next;
  // 没写 next 的顺序节点：按声明顺序走下一句
  const i = ORDER.indexOf(id);
  return i >= 0 && i + 1 < ORDER.length ? ORDER[i + 1] : 'branch';
}

function show(id) {
  if (id === 'branch') return finish();
  node = STORY[id];
  currentId = id;
  if (!node) { console.warn('missing node', id); return; }

  if (node.bg) setBg(node.bg);
  dayEl.textContent = node.day || '';
  if (ledEl) {
    if (node.ledger) { ledEl.textContent = node.ledger; ledEl.classList.add('on'); }
    else ledEl.classList.remove('on');
  }
  if (node.tick) { state.clock = Math.min(8, state.clock + node.tick); paintClock(); tickFx(); }

  choicesEl.classList.remove('on');
  choicesEl.innerHTML = '';
  waitingChoice = false;

  who.textContent = node.who || '';
  textEl.classList.toggle('narration', !node.who);
  hint.classList.remove('on');

  const body = typeof node.text === 'function' ? node.text(state) : (node.text || '');
  box.classList.add('on');
  typewrite(body, () => {
    if (node.choices) {
      waitingChoice = true;
      renderChoices(node.choices);
    } else {
      hint.classList.add('on');
    }
  });
}

function typewrite(str, done) {
  clearTimeout(typing);
  typing = null;
  textEl.textContent = '';
  let i = 0;
  const speed = 26;
  const pause = 240;

  function step() {
    if (i >= str.length) { typing = null; done(); return; }
    const ch = str[i++];
    textEl.textContent += ch;
    const wait = (ch === '。' || ch === '？' || ch === '\n') ? pause : speed;
    typing = setTimeout(step, wait);
  }
  typing = setTimeout(step, speed);
}

function finishTyping() {
  clearTimeout(typing); typing = null;
  textEl.textContent = typeof node.text === 'function' ? node.text(state) : (node.text || '');
  if (node.choices) { waitingChoice = true; renderChoices(node.choices); }
  else hint.classList.add('on');
}

function renderChoices(all) {
  const list = all.filter((c) => !c.if || c.if(state));
  choicesEl.innerHTML = '';
  list.forEach((c) => {
    const b = document.createElement('button');
    b.textContent = (list.indexOf(c) + 1) + '. ' + c.label;
    b.onclick = (ev) => {
      ev.stopPropagation();
      if (c.do) c.do(state);
      choicesEl.classList.remove('on');
      show(c.next);
    };
    choicesEl.appendChild(b);
  });
  choicesEl.classList.add('on');
}

function finish() {
  let key = state.wrote || 'c';
  if (state.forceC) key = 'c';
  endText.textContent = ENDINGS[key];
  endingEl.classList.add('show');
  box.classList.remove('on');
  choicesEl.classList.remove('on');
  if (ledEl) ledEl.classList.remove('on');
}

stage.addEventListener('click', () => {
  if (helpOpen) { toggleHelp(false); return; }
  if (!started) { start(); return; }
  if (endingEl.classList.contains('show')) { restart(); return; }
  if (waitingChoice) return;
  if (typing) { finishTyping(); return; }
  const nx = nextOf(currentId);
  if (nx) show(nx);
});

// 键盘也能推：空格 / 回车 / →
document.addEventListener('keydown', (ev) => {
  if (ev.key === 'm' || ev.key === 'M') {
    ev.preventDefault();
    muted = !muted;
    const kh = document.getElementById('keyhint');
    if (kh) kh.textContent = (muted ? 'M · 已静音' : 'M · 声音') + '　H · 规矩';
    return;
  }
  if (ev.key === 'h' || ev.key === 'H') { ev.preventDefault(); toggleHelp(); return; }
  if (helpOpen) return;
  if (ev.key === ' ' || ev.key === 'Enter' || ev.key === 'ArrowRight') {
    ev.preventDefault();
    stage.click();
  }
  if (waitingChoice && /^[1-9]$/.test(ev.key)) {
    const btn = choicesEl.children[Number(ev.key) - 1];
    if (btn) btn.click();
  }
});

function start() {
  started = true;
  titleEl.classList.remove('show');
  state = newState();
  resetClock();
  show('s0');
}

function restart() {
  endingEl.classList.remove('show');
  state = newState();
  resetClock();
  box.classList.remove('on');
  textEl.textContent = '';
  show('s0');
}

// 开场之前先把店亮起来
setBg('dusk');
