const reveals=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.06});reveals.forEach(el=>observer.observe(el))}else{reveals.forEach(el=>el.classList.add('visible'))}
const nav=document.querySelector('.nav');
const navLinks=[...nav.querySelectorAll('div a')];
let ticking=false;
function updateScroll(){nav.classList.toggle('scrolled',window.scrollY>25);let active='introduction';document.querySelectorAll('main>section').forEach(section=>{if(section.getBoundingClientRect().top<window.innerHeight*.35)active=section.id});navLinks.forEach(link=>{if(link.hash==='#'+active){link.setAttribute('aria-current','location')}else{link.removeAttribute('aria-current')}});ticking=false}
window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateScroll)}},{passive:true});updateScroll();
document.querySelectorAll('.award-gallery figure').forEach((el,i)=>el.style.setProperty('--reveal-delay',`${i*100}ms`));
const viewer=document.querySelector('.image-viewer');
let imageTrigger;
document.querySelectorAll('#achievements a[href^="assets/"]').forEach(link=>link.addEventListener('click',event=>{
  if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();imageTrigger=link;
  const source=link.querySelector('img');
  const description=source?.alt||link.getAttribute('aria-label')||'Certificate preview';
  viewer.querySelector('img').src=link.getAttribute('href');
  viewer.querySelector('img').alt=description;
  viewer.querySelector('p').textContent=description;
  viewer.showModal();document.body.classList.add('viewer-open');
}));
viewer.querySelector('.viewer-close').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',event=>{if(event.target===viewer){const r=viewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)viewer.close()}});
viewer.addEventListener('close',()=>{document.body.classList.remove('viewer-open');imageTrigger?.focus({preventScroll:true})});
