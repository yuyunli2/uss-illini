import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import InfoIndex from '../ShipsInfo/InfoIndex.js'
import Graph from '../Graph/Graph.js'
import Simulator from '../Simulator/Simulator.js'
const items = [
    {
        src: 'https://wowsp-wows-na.wgcdn.co/dcont/fb/image/tmb/f0c5e3ec-64e8-11e8-a157-d89d6715223c_1200x.jpg',
        altText: '',
        caption: ''
    },
    {
        src: 'https://wowsp-wows-na.wgcdn.co/dcont/fb/image/tmb/3d9fb018-084a-11e8-9ad1-d89d6715223c_1200x.jpg',
        altText: '',
        caption: ''
    },
    {
        src: 'https://wowsp-wows-na.wgcdn.co/dcont/fb/image/tmb/2242397e-974a-11e7-aecb-d89d6715223c_1200x.jpg',
        altText: '',
        caption: ''
    }
];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            pageIndex: 0
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    switchPages(pageId) {
        // PageId: {0:MainPage, 1:InfoIndex, 2:Player(Graph) }
        this.setState({ pageIndex: pageId});
    }

    render() {


        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img src={item.src} alt={item.altText} />
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            );
        });

        if(this.state.pageIndex === 1){
            return (
                <div>
                    <InfoIndex/>
                </div>
            );
        }
        else if(this.state.pageIndex === 2){
          return (
              <div>
                    <Graph/>
              </div>
          );
        }else if(this.state.pageIndex === -1){
            return (
                <div>
                      <Simulator/>
                </div>
            );
        }else return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">USS Illini</h1>
                    <hr className="my-2" />
                    <p>USS Illini is a website enable users to search players' and ships' data from out database.</p>
                    <p>It can measure the player's performance and enable new players to explore perimeters about new ships.</p>
                    <p className="lead">
                        <Button color="primary" onClick={() => this.switchPages(1)}>Warships Info</Button>
                        {' '}
                        <Button color="success" onClick={() => this.switchPages(2)}>Player Stats</Button>
                        {' '}
                        <Button color="white" onClick={() => this.switchPages(-1)}>Simulator</Button>
                    </p>
                    <Carousel
                        activeIndex={activeIndex}
                        next={this.next}
                        previous={this.previous}
                    >
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                    </Carousel>
                </Jumbotron>

            </div>
        );
    }
}
export default Index;
