import { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Avatar from '@mui/material/Avatar';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { generateVerificationCode, getVerificationCodes } from '../../../actions/adminActions';
import { useNavigate } from 'react-router-dom';
import { allTeamsGet } from '../../../actions/teamActions';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import AddBoxIcon from '@mui/icons-material/AddBox';



function Row(props) {
  const baseImageUrl = "images/teams/";
  const { row, verificationCodesObject } = props;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const generateVerificationCodeResponse = useSelector((state) => state.generateVerificationCode);
  const { loading, error, verificationCodes } = generateVerificationCodeResponse;
  const [generatedCodes, setGeneratedCodes] = useState([]);
  const [generatedId, setGeneratedId] = useState("");

  const [generationLoading, setGenerationLoading] = useState(false);

  const handleGenerate = (teamId) => {
    setGeneratedId(teamId);
    dispatch(generateVerificationCode(teamId));
  }

  useEffect(() => {
    setGeneratedCodes(verificationCodes);
  }, [verificationCodes])

  useEffect(() => {
    if (loading != null) {
      setGenerationLoading(loading);
    }
  }, [loading])
  
  
  

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          <CardHeader
            avatar={
              <Avatar src={`${baseImageUrl}${row.teamImage}`} />
            }
            title={row.club}
          />
        </TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {
                verificationCodesObject.length > 0 || ( generatedId === row._id && verificationCodes != null && verificationCodes.length > 0 ) ? 
                (
                  <>
                      <Typography variant="h6" gutterBottom component="div">
                    Verification Codes
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Code</TableCell>
                        <TableCell align="right">Used</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                      generatedId !== row._id ? 
                      (
                        verificationCodesObject.map((verificationCode) => (
                          <TableRow key={verificationCode._id}>
                            <TableCell component="th" scope="row">
                              {verificationCode.player.name}
                            </TableCell>
                            <TableCell align="right">{verificationCode.code}</TableCell>
                            <TableCell align="right">{verificationCode.isUsed ? <DoneIcon /> : <CloseIcon />}</TableCell>
                          </TableRow>
                        ))
                      )
                      :
                      (
                        verificationCodes.map((verificationCode) => (
                          <TableRow key={verificationCode._id}>
                            <TableCell component="th" scope="row">
                              {verificationCode.player.name}
                            </TableCell>
                            <TableCell align="right">{verificationCode.code}</TableCell>
                            <TableCell align="right">{verificationCode.isUsed ? <DoneIcon /> : <CloseIcon />}</TableCell>
                          </TableRow>
                        ))
                      )
                      
                    }
                    </TableBody>
                  </Table>
                </>
                )
                :
                (
                  <Box textAlign='center'>
                    <LoadingButton 
                      variant="contained" 
                      onClick={() => handleGenerate(row._id)}
                      loading={generationLoading}
                      loadingPosition="start"
                      startIcon={<AddBoxIcon />}
                    >Generate Verification Codes</LoadingButton>
                  </Box>
                )
              }
              
              
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    club: PropTypes.string.isRequired,
  }).isRequired,
};


export default function CollapsibleTable() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const teamResponse = useSelector((state) => state.allTeamsGet);
  const { loading, error, teamInfo } = teamResponse;

  const [verificationCodesLoading, setVerificationCodesLoading] = useState(true);


  useEffect(() => {
    if (!teamInfo) {
      dispatch(allTeamsGet(0, 25));
    }
  }, [navigate]);

  useEffect(() => {
    if (teamInfo) {
      setTeams(teamInfo);
    }
  }, [teamInfo]);

  const getVerificationCodesResponse = useSelector((state) => state.getVerificationCodes);
  const [teamsAndVerificationCodes, setTeamsAndVerificationCodes] = useState([]);

  useEffect(() => {
    if (getVerificationCodesResponse) {
      console.log(getVerificationCodesResponse);
      setVerificationCodesLoading(getVerificationCodesResponse.loading);
    }
    
  }, [getVerificationCodesResponse])

  useEffect(() => {
    dispatch(getVerificationCodes());
  }, [])

  const getVerificationCode = (teamId) => {
    const verificationCodes = getVerificationCodesResponse.teamsAndVerificationCodes;
    if (verificationCodes) {
      for (let i = 0; i < verificationCodes.length; i ++) {
        if (verificationCodes[i].team === teamId) {
          return verificationCodes[i].verificationCodes;
        }
      }
      return [];
    }
    return [];
  }


  return (
    verificationCodesLoading ? 
    (
       <Stack alignItems="center"><CircularProgress /></Stack>
    )
    :
    (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Teams</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          
            {teams.map((row) => (
            <Row key={row._id} row={row} verificationCodesObject={getVerificationCode(row._id)} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
  );
}