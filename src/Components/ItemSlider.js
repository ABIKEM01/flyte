import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function ItemSlider({ children, last }) {
    const settings = {
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: JSON.parse(localStorage.getItem('scrollToEnd')) == true ? last : 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        vertical: true,
        verticalSwiping: true,
        // initialSlide: children - 1,

    }
    return <Slider {...settings}>{children}</Slider>
}

export default ItemSlider
