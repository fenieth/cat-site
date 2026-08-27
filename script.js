const registerModal=document.querySelector('#register-modal');
const actionModal=document.querySelector('#action-modal');
const content=document.querySelector('#action-content');
const toast=document.querySelector('#toast');

document.querySelectorAll('.open-register').forEach(b=>b.addEventListener('click',()=>registerModal.showModal()));
document.querySelectorAll('.modal-close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.close()}));

document.querySelector('#register-form').addEventListener('submit',e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(e.currentTarget));
  localStorage.setItem('mur-profile',JSON.stringify(data));
  e.currentTarget.hidden=true;
  registerModal.querySelector(':scope > .eyebrow').hidden=true;
  registerModal.querySelector(':scope > h2').hidden=true;
  registerModal.querySelector(':scope > p').hidden=true;
  registerModal.querySelector('.success').hidden=false;
});
document.querySelector('.success-close').addEventListener('click',()=>registerModal.close());

const templates={
  assistant:`<span class="eyebrow"><i></i> быстрый помощник</span><h2>Что случилось?</h2><p>Коротко опишите вопрос. Помощник предложит безопасные первые шаги.</p><textarea id="question" placeholder="Например: кот второй день плохо ест..."></textarea><button class="btn" id="ask" style="margin-top:16px">Получить подсказку →</button><div id="answer"></div>`,
  friends:`<span class="eyebrow"><i></i> рядом с вами</span><h2>Котолюбы поблизости</h2><p>Укажите город — покажем людей из сообщества.</p><input id="friend-city" placeholder="Ваш город"><button class="btn" id="find" style="margin-top:16px">Найти друзей →</button><div id="people"></div>`,
  reminder:`<span class="eyebrow"><i></i> забота по плану</span><h2>Новое напоминание</h2><p>Что нужно не забыть?</p><input id="reminder-text" placeholder="Например: дать таблетку"><button class="btn" id="save-reminder" style="margin-top:16px">Сохранить →</button>`
};

document.querySelectorAll('.feature-link').forEach(b=>b.addEventListener('click',()=>{
  const type=b.dataset.action;content.innerHTML=templates[type];actionModal.showModal();
  if(type==='assistant') document.querySelector('#ask').onclick=()=>{const q=document.querySelector('#question').value.trim();document.querySelector('#answer').innerHTML=q?`<div class="answer"><b>С чего начать:</b><br>Проверьте воду, аппетит и общее самочувствие кота. Если состояние резко ухудшилось, есть боль, затруднённое дыхание или кот не ест больше суток — обратитесь к ветеринару. Онлайн-совет не заменяет осмотр.</div>`:''};
  if(type==='friends') document.querySelector('#find').onclick=()=>{const city=document.querySelector('#friend-city').value.trim()||'вашем городе';document.querySelector('#people').innerHTML=`<div class="mini-list"><div class="mini-person"><span>🐱</span><p><b>Алина и Плюша</b>${city} · любят спокойные прогулки</p></div><div class="mini-person"><span>😸</span><p><b>Марат и Кекс</b>${city} · готовы помочь с передержкой</p></div></div>`};
  if(type==='reminder') document.querySelector('#save-reminder').onclick=()=>{const v=document.querySelector('#reminder-text').value.trim();if(v){localStorage.setItem('mur-reminder',v);actionModal.close();showToast('Напоминание сохранено ✓')}};
}));
function showToast(text){toast.textContent=text;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2600)}
