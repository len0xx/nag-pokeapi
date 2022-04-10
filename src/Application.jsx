import './App.css';
import useSWR from 'swr'
import Pokemon from './Pokemon';
import Header from './Header';
import { useState } from 'react';
import { Pagination, Grid, CircularProgress } from '@mui/material';

const API_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/';

const LIMIT = 12;

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Application() {
    const [ page, setPage ] = useState(1);
    const { data, error } = useSWR(`${API_ENDPOINT}?limit=${LIMIT}&offset=${page * LIMIT}`, fetcher);
    const [ totalPages, setTotalPages ] = useState(2);

    function Content(props) {
        if (props.error) {
            return (
                <>
                    <h1>There was an error while fetching the data</h1>
                    <p>Try reloading the page</p>
                </>
            );
        }
        else if (props.data && props.data.results.length) {
            setTotalPages(Math.ceil(props.data.count / LIMIT));
            return (
                <>
                    <Grid container spacing={3}>
                        {props.data.results.map(pokemon => {
                            return (
                                <Grid item xs={6} sm={4} md={3} xl={2} key={ pokemon.name }>
                                    <Pokemon url={ pokemon.url } />
                                </Grid>
                            );
                        })}
                    </Grid>
                </>
            );
        }
        else {
            return (
                <div className="loading-wrapper">
                    <CircularProgress />
                </div>
            );
        }
    }

    return (
        <div className="App">
            <Header />
            <div className="content-wrapper">
                <Content data={data} error={error} />
            </div>
            <div className="pagination-wrapper">
                <Pagination page={page} count={totalPages} onChange={(event, page) => { setPage(page) }} />
            </div>
        </div>
    );
}
