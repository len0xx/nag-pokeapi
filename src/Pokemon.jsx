import useSWR from 'swr';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActionArea,
    Skeleton
} from '@mui/material';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Pokemon(props) {
    const { data } = useSWR(props.url, fetcher);

    return (
        <Card>
            <CardActionArea>
                { data ? 
                    <CardMedia
                        component="img"
                        height={240}
                        image={ data.sprites.front_default }
                        alt={ data.name }
                    /> :
                    <Skeleton height={240} />
                }
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        { data ? data.name : <Skeleton /> }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        { data ?
                            (<p>
                                Height: { data.height }<br />
                                Weight: { data.weight }
                            </p>) :
                            <Skeleton />
                        }
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
