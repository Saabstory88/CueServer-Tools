class RGBW {
  constructor(opts, address, data) {
    if(typeof(opts) == 'undefined'){
      this.applyFunction(function(){
        return 0;
      });
    } else {
      this.r = (opts.r);
      this.g = (opts.g);
      this.b = (opts.b);
      this.w = (opts.w);

    }

    if(typeof(address) != 'undefined'){
      this.address = address;
    }

    if(typeof(data) != 'undefined'){
      this.data = data;
    }
  }

  applyFunction(func){
    this.r = func();
    this.g = func();
    this.b = func();
    this.w = func();
  }

  lerpColor(pos, color){
    return new RGBW({
      r: Num.lerp(this.r, color.r, pos),
      g: Num.lerp(this.g, color.g, pos),
      b: Num.lerp(this.b, color.b, pos),
      w: Num.lerp(this.w, color.w, pos)
    });
  }

  setColorHTP(color){
    let r = Math.max(this.r, color.r);
    let g = Math.max(this.g, color.g);
    let b = Math.max(this.b, color.b);
    let w = Math.max(this.w, color.w);
    this.setColor(r, g, b, w);
  }

  setColor(r, g, b, w){
    if(typeof(g) == 'undefined' && typeof(b) == 'undefined'){
      this.r = r.r;
      this.g = r.g;
      this.b = r.b;
      this.w = r.w;
    } else {
      this.r = r;
      this.b = b;
      this.g = g;
      this.w = w;
    }
  }

  update(){
    if(typeof(this.data) != 'undefined'){
      this.data.set(new Uint8ClampedArray([this.r, this.g, this.b, this.w]), (this.address - 1))
    } else {
      console.log("This rgbw is not bound to any data")
    }
  }

  static random(){
    let rand = new RGBW();
    rand.applyFunction(function(){
      return Math.round(Math.random() * 100);
    });
    return rand;
  }

}

module.exports = RGBW;
