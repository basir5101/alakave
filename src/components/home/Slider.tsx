import React from 'react'
import {
    Carousel, CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel'

export default function Slider() {
    return (
        <Carousel>
            <CarouselContent>
                <CarouselItem>
                    <div className="h-52 bg-yellow-300 flex items-center justify-center"> One </div>
                </CarouselItem>
                <CarouselItem>
                    <div className="h-32 bg-yellow-300 flex items-center justify-center"> Two </div>
                </CarouselItem>
                <CarouselItem>
                    <div className="h-32 bg-yellow-300 flex items-center justify-center"> Three </div>
                </CarouselItem>
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
        </Carousel>
    )
}
