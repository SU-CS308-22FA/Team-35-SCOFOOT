import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { getChangeRequests, removeChangeRequest } from '../../../actions/playerActions';
import { useNavigate } from 'react-router-dom';


export default function ChangeRequests() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const changeRequestResponse = useSelector((state) => state.getChangeRequests);
    const { loading, error, changeRequests } = changeRequestResponse;

    useEffect(() => {
      if (changeRequests) {
        setRequests(changeRequests);
      }
    }, [changeRequests])

    useEffect(() => {
      dispatch(getChangeRequests());
    }, [])
    
    
    const removeRequest = (changeRequest) => {
        const tempRequests = structuredClone(requests);
        const index = requests.indexOf(changeRequest);
        if (index > -1) { // only splice array when item is found
            tempRequests.splice(index, 1); // 2nd parameter means remove one item only
        }
        setRequests(tempRequests);
        dispatch(removeChangeRequest(changeRequest._id));
    }
  
  
    return (
     <>
    
    { 
    requests.map((changeRequest) => (
        <Card key={changeRequest._id} sx={{ minWidth: 275, m:'5px' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {changeRequest.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {changeRequest.playerName.name}
          </Typography>
          <Typography variant="body2">
            {changeRequest.request}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => removeRequest(changeRequest)}>Remove</Button>
        </CardActions>
        </Card>
        ))
    }
    </>
    );
  }