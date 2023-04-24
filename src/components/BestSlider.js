import React, { Component } from "react";
import Slider from "react-slick";
import "./BestSlider.css";
import errorImage from "./no-image.jpeg";
import bestItem1 from "./bestSeller/best1.jpg";
import bestItem2 from "./bestSeller/best2.jpg";
import bestItem3 from "./bestSeller/best3.jpg";
import bestItem4 from "./bestSeller/best4.jpg";
import bestItem5 from "./bestSeller/best5.jpg";
import bestItem6 from "./bestSeller/best6.jpg";
import bestItem7 from "./bestSeller/best7.jpg";
import bestItem8 from "./bestSeller/best8.jpg";
import bestItem9 from "./bestSeller/best9.jpg";
import bestItem10 from "./bestSeller/best10.jpg";
import arrowPrev from"./arrow-prev.png";
export default class BestSlider extends Component {
  render() {
 
    const Prev = (props)=>{
      const {onClick} =props;
      return (
        <div className="bestSlider__prev" onClick={onClick}><img src={arrowPrev} alt="arrow-prev" 
        style={{  width:"60px",height:"70px"}}/></div>
      );
    }
    const Next = (props)=>{
      const {onClick} =props;
      return (
        <div className="bestSlider__next" onClick={onClick}><img src={arrowPrev} alt="arrow-next" style={{
          width:"60px",height:"70px", transform: "scaleX(-1)"
        }}/></div>
      );
    }
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable : false,
      autoplay: true,
      autoplaySpeed : 5000,
      prevArrow:<Prev/>,
      nextArrow:<Next/>,
    }; 
    const bestItems =[
        bestItem1,
        bestItem2,
        bestItem3,
        bestItem4,
        bestItem5,
        bestItem6,
        bestItem7,
        bestItem8,
        bestItem9,
        bestItem10,
    ];
    function noImage(event){
        event.target.src=errorImage;
    }
    return (
        <div className="Container">
            <Slider {...settings}>
            {bestItems.map((item,index)=>
            <div className="bestSlider__img" key={index}>
                <img src={item} alt="bestitem" onError={noImage}></img>             
            </div>
            )}
            </Slider>
        </div>
    );
  }
}