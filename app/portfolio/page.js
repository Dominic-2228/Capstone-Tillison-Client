import "./page.css"
export default function Portfolio () {

  return (
    <>
    <h1>Portfolio</h1>
    <div className="img-header">Baby Photos</div>
  <div className="container">
  <div className="row">
    <img className="image-samples" loading="lazy" src="/DOM_6586.jpg" alt="Sample" />
    <img className="image-samples" loading="lazy" src="/DOM_6619.jpg" alt="Sample" />
    <img className="image-samples" loading="lazy" src="/DSC_0177.jpg" alt="Sample" />
    <img className="image-samples" loading="lazy" src="/DSC_0212.jpg" alt="Sample" />
    <img className="image-samples" loading="lazy" src="/DOM_6243.jpg" alt="Sample" />
    <img className="image-samples" loading="lazy" src="/DOM_6311.jpg" alt="Sample" />
    <img className="image-samples" loading="lazy" src="/DOM_6313.jpg" alt="Sample" />
  </div>
</div>
<div className="container">
<div className="img-headers">Nature Photos</div>
<img className="image-samples" loading="lazy"  src="/IMG_20210518_205611.jpg" alt="Sample" />
<img className="image-samples" loading="lazy" src="/IMG_20201002_160614_318.jpg" alt="Sample" />
<img className="image-samples" loading="lazy" src="/DSC_0697.jpg" alt="Sample" />
<img className="image-samples" loading="lazy" src="/DSC_0589.jpg" alt="Sample" />
<img className="image-samples" loading="lazy" src="/PXL_20210813_003504344.jpg" alt="Sample" />
</div>
</>
  )
}