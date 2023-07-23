import {Component, OnInit} from '@angular/core';
import {KBandService} from '../../service/k-band.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {

  loading = true;

  totalItems = 0; // Variável para armazenar o número total de itens
  itemsPorPagina = 10; // Número de itens exibidos por página
  pageSizeOptions = [5, 10, 25, 100]; // Opções de tamanhos de página disponíveis
  currentPage = 1; // Página atual
  videos: any[] = [];

  img = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/';

  constructor(private service: KBandService) {
  }

  ngOnInit(): void {
    this.searchVideos('');
  }

  searchVideos(query: string): void {
    this.loading = true;
    this.service.getMoviesByQuery(query).subscribe(
      (videos: any[]) => {
        // Simular um atraso de 2 segundos
        setTimeout(() => {
          this.videos = videos;
          this.totalItems = this.videos.length;
          console.log('aqui os videos retornados', videos);

          this.loading = false;
        }, 10000);
      },
      (error: any) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  onPageChange(event: any): void {
    // Atualiza a página atual quando ocorre a mudança de página
    this.currentPage = event.pageIndex + 1;
    this.itemsPorPagina = event.pageSize;
  }

  getPaginatedUsers(): any[] {
    // Retorna os usuários correspondentes à página atual
    const startIndex = (this.currentPage - 1) * this.itemsPorPagina; // Índice de início da página
    const endIndex = startIndex + this.itemsPorPagina; // Índice de fim da página
    return this.videos.slice(startIndex, endIndex); // Retorna uma fatia dos usuários com base nos índices
  }
}
