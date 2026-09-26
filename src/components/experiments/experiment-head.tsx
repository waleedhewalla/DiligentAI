import { liveExperiments } from "@/content/experiments";

/**
 * Assignment script + CSS for live A/B tests. Rendered in <head> so the
 * variant is chosen before first paint. Preview mode assigns everyone "a"
 * unless ?exp_<id>=a|b is in the URL (forced choices are not remembered).
 */
export function ExperimentHead() {
  const live = liveExperiments();
  if (!live.length) return null;
  const config = live.map((e) => ({ id: e.id, run: e.status === "running", w: e.weights[0] }));
  const css = live
    .map(
      (e) =>
        `html[data-exp-${e.id}="b"] .exp-${e.id}-a,html:not([data-exp-${e.id}="b"]) .exp-${e.id}-b{display:none!important}` +
        (e.id === "homeorder" ? `html[data-exp-homeorder="b"] #product{order:-1}` : ""),
    )
    .join("");
  const script = `(function(){var E=${JSON.stringify(config)},q=new URLSearchParams(location.search),d=document.documentElement,a={};
E.forEach(function(e){var k="da_exp_"+e.id,f=q.get("exp_"+e.id),v=null;
if(f==="a"||f==="b"){v=f}else if(e.run){try{v=localStorage.getItem(k)}catch(_){}
if(v!=="a"&&v!=="b"){v=Math.random()*100<e.w?"a":"b";try{localStorage.setItem(k,v)}catch(_){}}}else{v="a"}
d.setAttribute("data-exp-"+e.id,v);a[e.id]=v});window.__daExp=a})();`;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
