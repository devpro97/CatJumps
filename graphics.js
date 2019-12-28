var pathToPictures = 'content';
class Sprite{
    constructor(name, width, heigth){
        this.width = width;
        this.heigth = heigth;
        this.src = pathToPictures + '/' + name;
        this.pic = null;
    }
    picture(){
        if(this.pic == null) {
            this.picture = () => {
                return this.pic;
            }
        }
        this.pic = new Image(this.width, this.heigth);
        this.pic.src = this.src; 
        return this.pic;
    }
}