import { Component, OnInit, ElementRef } from "@angular/core"


@Component({
  selector: 'app-captchaverify',
  templateUrl: './captchaverify.component.html',
  styleUrls: ['./captchaverify.component.scss']
})
export class CaptchaverifyComponent implements OnInit {
  data: any
  typeText:string='' 
  constructor(private elRef: ElementRef) { }


  ngOnInit(): void {
    this.getCaptcha()
  }



  getCaptcha() {

    let canvas = document.querySelector('canvas');
    let pen = canvas?.getContext('2d')

    pen!.clearRect(0, 0, canvas!.width, canvas!.height);
    pen!.font = "30px Georgia"
    pen!.fillStyle = "gery"
    //pen!.fillRect(0,0, 400,400) 
    pen!.fillStyle = "Orange"

    let captcha = Math.random().toString(36).substring(2, 8)



    let maxLength = captcha.length
    maxLength = captcha.length;

    console.log('Max Length ', maxLength)

    let index1 = this.getRandIndex(maxLength);
    let index2 = this.getRandIndex(maxLength);

    console.log('index1', captcha[index1].toLowerCase().toUpperCase())
    console.log('index2', captcha[index2].toLowerCase().toUpperCase())

    captcha = captcha.substring(0, index1 - 1) + captcha[index1].toLowerCase().toUpperCase() + captcha.substring(index1 + 1, maxLength)
    captcha = captcha.substring(0, index2 - 1) + captcha[index2].toLowerCase().toUpperCase() + captcha.substring(index2 + 1, maxLength)

    console.log('Captcha', captcha)
    this.data = captcha
    captcha = captcha.split('').join(' ')

    pen!.fillText(captcha, 40, 40)
  }

  getRandIndex(maxLength: number) {
    return Math.floor(Math.random() * maxLength)
  }

  checkit() {

    console.log('data ', this.data)
    console.log('Text Type ', this.typeText)
    if (this.data == this.typeText )
      alert('Matched')
    else
      alert('Invalid')
    //console.log('typedata', this.data)

  }

}
