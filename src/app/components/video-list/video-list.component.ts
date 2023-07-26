import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {KBandService} from '../../service/k-band.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {

  loading = true;

  totalItems = 0; // Variável para armazenar o número total de itens
  itemsPorPagina = 10; // Número de itens exibidos por página
  pageSizeOptions = [10, 20]; // Opções de tamanhos de página disponíveis
  currentPage = 1; // Página atual
  videos: any[] = [];
  setvideos: any[] = [];
  event: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  img = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/';

  constructor(private service: KBandService) {
  }

  ngOnInit(): void {
    this.service.getMoviesPage(1).subscribe(
      res => {
        console.log('aqui o console', res);
        this.setvideos = res.results;
        this.videos = this.setvideos;
        this.totalItems = res.total_results;
        console.log('aqui os videos retornados', this.videos);
        // console.log('aqui a pagina', total_pages);
        // console.log('aqui results total ', res.results.total_results);
        this.loading = false;
      },
      (error: any) => {
        console.error(error);
        this.loading = false;
      }
    );
  }


  /**
   * Função para filtrar os vídeos com base no título.
   * @param value A string de pesquisa para filtrar os vídeos.
   */
  searchResult(value: string): void {
    // Filtra os vídeos com base no título usando o método filter().
    // O método filter() cria um novo array com os elementos do array original (setvideos)
    // que atendem à condição especificada na função de retorno (arrow function).
    const filter = this.setvideos.filter((video: any) => {
      // Converte o título do vídeo e o valor de pesquisa em minúsculas usando toLowerCase().
      // Isso garante que a comparação seja insensível a maiúsculas e minúsculas.
      // Em seguida, usa o método includes() para verificar se o título do vídeo contém a string de pesquisa.
      // Se a string de pesquisa estiver presente no título, o método includes() retorna true; caso contrário, retorna false.
      return video.title.toLowerCase().includes(value.toLowerCase());
    });

    // Atualiza o array 'videos' com o resultado do filtro,
    // o que irá mostrar apenas os vídeos cujo título contenha a string de pesquisa.
    this.videos = filter;
  }


  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPorPagina = event.pageSize;

    this.service.getMoviesPage(this.currentPage).subscribe(
      res => {
        this.videos = res.results; // Atualizar a variável videos com os resultados da próxima página
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


}
