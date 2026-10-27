document.addEventListener('DOMContentLoaded',()=>{
  if(window.lucide)lucide.createIcons();
  document.getElementById('year').textContent=new Date().getFullYear();
  const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
  menu.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(opened));menu.innerHTML=`<i data-lucide="${opened?'x':'menu'}"></i>`;if(window.lucide)lucide.createIcons()});
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.innerHTML='<i data-lucide="menu"></i>';if(window.lucide)lucide.createIcons()}));
  const track=document.getElementById('portfolioTrack'),dots=document.getElementById('carouselDots'),cards=[...track.children];
  // Repetição dos mesmos quatro projetos do esboço para deslizar continuamente em loop.
  const total=cards.length;
  cards.forEach(card=>track.appendChild(card.cloneNode(true)));
  cards.forEach(card=>track.appendChild(card.cloneNode(true)));
  let index=total, timer, busy=false;
  for(let i=0;i<total;i++){const btn=document.createElement('button');btn.type='button';btn.setAttribute('aria-label',`Mostrar projeto ${i+1}`);btn.addEventListener('click',()=>moveTo(total+i));dots.appendChild(btn)}
  function widthStep(){return track.children[1].getBoundingClientRect().left-track.children[0].getBoundingClientRect().left}
  function paint(animated=true){track.style.transition=animated?'transform .6s cubic-bezier(.2,.75,.15,1)':'none';track.style.transform=`translate3d(-${index*widthStep()}px,0,0)`;[...dots.children].forEach((dot,i)=>dot.classList.toggle('active',i===((index%total)+total)%total))}
  function moveTo(n){if(busy)return;index=n;busy=true;paint(true);resetTimer()}
  track.addEventListener('transitionend',e=>{if(e.propertyName!=='transform')return;if(index>=total*2){index-=total;paint(false)}else if(index<total){index+=total;paint(false)}busy=false});
  function next(){moveTo(index+1)}function prev(){moveTo(index-1)}
  function resetTimer(){clearInterval(timer);timer=setInterval(()=>{if(!document.hidden&&!busy)next()},3300)}
  document.querySelector('.carousel-arrow.next').addEventListener('click',next);
  document.querySelector('.carousel-arrow.prev').addEventListener('click',prev);
  const area=document.querySelector('.portfolio-area');area.addEventListener('mouseenter',()=>clearInterval(timer));area.addEventListener('mouseleave',resetTimer);
  let startX=0;area.addEventListener('touchstart',e=>startX=e.touches[0].clientX,{passive:true});area.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>45)(dx<0?next:prev)()},{passive:true});
  window.addEventListener('resize',()=>paint(false));
  requestAnimationFrame(()=>{paint(false);resetTimer()});
  const links=[...nav.querySelectorAll('a')];const sections=[...document.querySelectorAll('main section[id]')];
  if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(!e.isIntersecting)return;links.forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id))})},{rootMargin:'-20% 0px -65% 0px'});sections.forEach(s=>observer.observe(s))}
});
