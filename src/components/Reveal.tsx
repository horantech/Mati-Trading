import type { ElementType, ReactNode } from "react";

/**
 * Fades content up when it scrolls into view.
 *
 * This is a plain server-rendered wrapper: the scroll observer lives in a tiny inline
 * script in <head> (see revealScript below, injected by SiteShell). That script starts
 * while the HTML is still arriving, so content never waits for the React bundle to
 * download before it can appear. Reduced motion and no-JS are handled in CSS.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  return (
    <Tag className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties} suppressHydrationWarning>
      {children}
    </Tag>
  );
}

/**
 * Inline script: watches every .reveal element (including ones added later by client-side
 * navigation) and sets data-visible="true" when it enters the viewport.
 */
export const revealScript = `(function(){
var d=document.documentElement;
if(!("IntersectionObserver" in window)||!("MutationObserver" in window)){d.classList.add("no-reveal");return;}
var io=new IntersectionObserver(function(es){for(var i=0;i<es.length;i++){var e=es[i];if(e.isIntersecting){e.target.setAttribute("data-visible","true");io.unobserve(e.target);}}},{rootMargin:"0px 0px -8% 0px",threshold:0.01});
var queued=false;
function scan(){queued=false;var els=document.querySelectorAll(".reveal:not([data-watch])");for(var i=0;i<els.length;i++){els[i].setAttribute("data-watch","");io.observe(els[i]);}}
function queue(){if(!queued){queued=true;requestAnimationFrame(scan);}}
new MutationObserver(queue).observe(d,{childList:true,subtree:true});
document.addEventListener("DOMContentLoaded",scan);
})();`;
