import * as React from 'react';
import axios from 'axios';
import Link from 'next/link';

function getDevicePixelRatio() {
  var ratio = 1;
  // To account for zoom, change to use deviceXDPI instead of systemXDPI
  if (
    window.screen.systemXDPI !== undefined &&
    window.screen.logicalXDPI !== undefined &&
    window.screen.systemXDPI > window.screen.logicalXDPI
  ) {
    // Only allow for values > 1
    ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
  } else if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio;
  }
  return ratio;
}

const IMGIX_URL = 'http://500cats.imgix.net/';
const CROP_MODE = 'fit=crop&crop=entropy&auto=format&lossless=true';

function getImgIxUrl(url) {
  const pathname = url.match(/([^\/]+)$/)[1];
  return `${IMGIX_URL}${pathname}`;
}

export default class ImgIxImg extends React.Component<
  { url: string },
  { url?: string }
> {
  private canvas: HTMLElement;
  private img: HTMLImageElement;

  componentDidMount() {
    this.preload();
  }

  onLoad = () => {
    this.setState({
      url: this.img.src,
    });
  };

  componentWillReceiveProps(props) {
    this.preload();
  }

  componentWillUnmount() {
    const { img } = this;
    if (img) {
      img.onload = img.onerror = img.onabort = null;
    }
    delete this.img;
  }

  preload() {
    if (!this.canvas || this.img) {
      return;
    }
    const size = this.canvas.clientWidth;
    const params = `w=${size}&h=${size}&dpr=${getDevicePixelRatio()}`;

    const imgUrl = `${getImgIxUrl(this.props.url)}?${CROP_MODE}&${params}`;

    const img = (this.img = new Image());

    img.src = imgUrl;

    // Already cached?
    let isLoaded = img.complete || img.width + img.height > 0;

    if (!isLoaded) {
      img.onload = img.onerror = img.onabort = this.onLoad;
    } else {
      this.onLoad();
    }
  }

  componentWillMount() {
    const { url } = this.props;

    const pathname = url.match(/([^\/]+)$/)[1];
    const lqip = `blur=200&px=16&auto=format&w=200&h=200&${CROP_MODE}`;
    this.setState({
      url: `${getImgIxUrl(url)}?${lqip}`,
    });
  }

  render() {
    const { url } = this.state;

    return (
      <div
        ref={canvas => {
          this.canvas = canvas;
        }}
      >
        <img src={url} />
        <style jsx global>{`
          img {
            display: block;
            width: 100%;
          }
        `}</style>
      </div>
    );
  }
}
