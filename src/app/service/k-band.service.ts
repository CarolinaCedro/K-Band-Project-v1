import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KBandService {

  private apiKey = '123c1a70bd7a86d5b5d9149d8c11a1f2';
  private url = 'https://api.themoviedb.org/3';
  totalMovies: any[] = [];
  private pageSize = 20; // Defina o tamanho da página aqui


  // https://api.themoviedb.org/3/discover/movie?api_key=b51b535b2fa399a23d7dfdf78f4f91c3&language=en-US&page=1


  constructor(private http: HttpClient) {
  }

  private getMoviesPage(page: number): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjNjMWE3MGJkN2E4NmQ1YjVkOTE0OWQ4YzExYTFmMiIsInN1YiI6IjY0YmQzMGYxYWQ1MGYwMDEwMWExMDZmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OBNJMP4uEhLJoKeulRr0nIVIoSlb8X8U4MfbwqVZqJM'
    });

    const params = new HttpParams({
      fromObject: {
        api_key: this.apiKey,
        language: 'pt-br',
        page: page.toString()
      }
    });

    return this.http.get<any>(`${this.url}/discover/movie?`, {headers, params}).pipe(
      map(response => response.results
      )
    );
  }

  getMoviesByPage(page: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjNjMWE3MGJkN2E4NmQ1YjVkOTE0OWQ4YzExYTFmMiIsInN1YiI6IjY0YmQzMGYxYWQ1MGYwMDEwMWExMDZmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OBNJMP4uEhLJoKeulRr0nIVIoSlb8X8U4MfbwqVZqJM'
    });

    const params = new HttpParams({
      fromObject: {
        api_key: this.apiKey,
        language: 'pt-br',
        page: page.toString() // Converte o número da página para string
      }
    });

    return this.http.get<any>(`${this.url}/discover/movie`, { headers, params }).pipe(
      map(response => {
        console.log('valores', response.results);
        console.log('tamanho de valores', response.results.length);
        return response.results; // Retornar o valor do response.results
      })
    );
  }

  get getMovies(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjNjMWE3MGJkN2E4NmQ1YjVkOTE0OWQ4YzExYTFmMiIsInN1YiI6IjY0YmQzMGYxYWQ1MGYwMDEwMWExMDZmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OBNJMP4uEhLJoKeulRr0nIVIoSlb8X8U4MfbwqVZqJM'
    });

    const params = new HttpParams({
      fromObject: {
        api_key: this.apiKey,
        language: 'pt-br',
        page: '3'
      }
    });
    return this.http.get<any>(`${this.url}/discover/movie?`, {headers, params}).pipe(
      map(response => {
        console.log('valores', response.results);
        console.log('tamanho de valores', response.results.length);
        return response.results; // Retornar o valor do response.results
      })
    );
  }

  //Esse filtra pelo id
  getMoviesByIds(genreIds: number[]): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjNjMWE3MGJkN2E4NmQ1YjVkOTE0OWQ4YzExYTFmMiIsInN1YiI6IjY0YmQzMGYxYWQ1MGYwMDEwMWExMDZmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OBNJMP4uEhLJoKeulRr0nIVIoSlb8X8U4MfbwqVZqJM'
    });

    const params = new HttpParams({
      fromObject: {
        api_key: this.apiKey,
        limit: '100',
        with_genres: genreIds.join(',') // Os IDs dos gêneros são enviados como uma string separada por vírgulas
      }
    });

    return this.http.get<any>(`${this.url}/discover/movie?&language=pt-br`, {headers, params}).pipe(
      map(response => {
        console.log('valores', response.results);
        console.log('tamanho de valores', response.results.length);
        return response.results; // Retornar o valor do response.results
      })
    );
  }


  // tslint:disable-next-line:no-shadowed-variable
  getMoviesByQuery(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjNjMWE3MGJkN2E4NmQ1YjVkOTE0OWQ4YzExYTFmMiIsInN1YiI6IjY0YmQzMGYxYWQ1MGYwMDEwMWExMDZmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OBNJMP4uEhLJoKeulRr0nIVIoSlb8X8U4MfbwqVZqJM'
    });

    const params = new HttpParams({
      fromObject: {
        api_key: this.apiKey,
        query,
        limit: '1000'
      }
    });

    return this.http.get<any>(`${this.url}/discover/movie?&language=pt-br`, {headers, params}).pipe(
      map(response => {
        console.log('valores', response.results);
        return response.results; // Retornar o valor do response.results
      })
    );
  }


  getDetailsAboutMovieSelected(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjNjMWE3MGJkN2E4NmQ1YjVkOTE0OWQ4YzExYTFmMiIsInN1YiI6IjY0YmQzMGYxYWQ1MGYwMDEwMWExMDZmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OBNJMP4uEhLJoKeulRr0nIVIoSlb8X8U4MfbwqVZqJM'
    });

    const params = new HttpParams({
      fromObject: {
        api_key: this.apiKey,
        id
      }
    });

    return this.http.get<any>(`${this.url}/movie/${id}?&language=pt-br`, {headers, params}).pipe(
      map(response => {
        console.log(response);
        return response;
      })
    );
  }
}
