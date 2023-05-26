import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";  

@Component({
  selector: 'app-heroform',
  templateUrl: './heroform.component.html',
  styleUrls: ['./heroform.component.css']
})
export class HeroformComponent {

  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  heroForm=this.fb.group({
    name: [null,Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(30)])],
    alterEgo:[null],
    power:[null,Validators.required],
  });


  // this.heroForm.setValue({  
  //   name: this.model.name,  
  //   alterEgo: this.model.alterEgo,
  //   power: this.model.power  
  // });  

  heroes:Hero[]=[];
  constructor(private heroService: HeroService,private fb: FormBuilder) { }

  model = new Hero(21, 'Dr. IQ', this.powers[0], 'Chuck Overstreet');

  submitted = false;

  onSubmit() { 
    this.submitted = true;
    this.heroService.addHero(this.model)
    .subscribe(hero => {
      this.heroes.push(hero);
    });  }

  newHero() {
    this.model = new Hero(42, '', '');
  }

}
