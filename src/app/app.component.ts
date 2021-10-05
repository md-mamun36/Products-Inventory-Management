import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './myService/app-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  header: boolean = true

  constructor(private _headersec: AppServiceService, private router: Router) {
    this._headersec.header.subscribe(res => {
      this.header = res
    })
  }

  ngOnInit() {
    if(this.myName=='' || this.myName==null){
  
      this.router.navigate(['login'])
    }
    else{
      this.router.navigate(['home'])
    }
  
  
  }
 
  myName:string=sessionStorage.getItem("userName")
 
  width: number = 100;
  height: number = 100;
  myStyle: Object = {
    'position': 'fixed',
    'width': '100%',
    'height': '100%',
    'z-index': 0,
    'top': 0,
    'left': 0,
    'right': 0,
    'bottom': 0,
  };
  myParams: object = {
    "particles": {
      "number": {
        "value": 100,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#fff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 1,
          "color": "#fff"
        },
        "image": {
          "src": "img/github.svg",
          "width": 10,
          "height": 10
        }
      },
      "opacity": {
        "value": 0.9,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.9,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 200,
        "color": "#fff",
        "opacity": 0.4,
        "width": 1.5
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 10,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 10,
          "size": 10,
          "duration": 20,
          "opacity": 1,
          "speed": 4
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 10
        },
        "remove": {
          "particles_nb": 10
        }
      }
    },
    "retina_detect": true
  };


  onlogout() {
    sessionStorage.removeItem("userName");
    this.header = false;
  
    this.router.navigate(['login'])
   
    window.location.reload();
  }

}
