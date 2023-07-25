import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {KBandService} from '../../service/k-band.service';
import {pipe} from 'rxjs';
import {HomeComponent} from '../home/home.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movieDetails: any;
  loading!: boolean;

  img = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/';

  constructor(private activeRoute: ActivatedRoute, private service: KBandService) {
  }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params.id;
    console.log('aqui o id:', id);
    this.loading = true;
    this.service.getDetailsAboutMovieSelected(id).subscribe(
      (res: any[]) => {

        this.movieDetails = res;
        this.loading = false;
        console.log('recebido com sucesso', res);
      }, (error: any) => {
        this.loading = true;
        console.log(error);
      }
    );
  }
}
