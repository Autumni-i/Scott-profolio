const reveals=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.06});reveals.forEach(el=>observer.observe(el))}else{reveals.forEach(el=>el.classList.add('visible'))}
const nav=document.querySelector('.nav');
const navLinks=[...nav.querySelectorAll('div a')];
let ticking=false;
function updateScroll(){nav.classList.toggle('scrolled',window.scrollY>25);let active='introduction';document.querySelectorAll('main>section').forEach(section=>{if(section.getBoundingClientRect().top<window.innerHeight*.35)active=section.id});navLinks.forEach(link=>{if(link.hash==='#'+active){link.setAttribute('aria-current','location')}else{link.removeAttribute('aria-current')}});ticking=false}
window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateScroll)}},{passive:true});updateScroll();
document.querySelectorAll('.award-gallery figure').forEach((el,i)=>el.style.setProperty('--reveal-delay',`${i*100}ms`));
