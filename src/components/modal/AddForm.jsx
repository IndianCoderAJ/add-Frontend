import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { actionAdd } from '../../redux/_actions';
import { useDispatch,useSelector } from 'react-redux';


const theme = createTheme();



export default function AddForm(props) {      
  const regex =  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;  
  
  let { singleAdd } = useSelector((state) => state.add)
  const dispatch = useDispatch();

  Yup.addMethod(Yup.string, "youtubelinkValidator", function (errorMessage) {
    return this.test(`test-card-length`, errorMessage, function (value) {
      const { path, createError } = this;
      if(formik.values.type && formik.values.type ==='VIDEO_AD'){
        if (value) {
          var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
          var match = value.match(regExp);
          if (match && match[2].length == 11) {
              // Do anything for being valid
              return true;
          }
          else {
            createError({ path, message: errorMessage })
          }
        }
     }else{
          var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(value)? true: createError({ path, message: "Please provide link only" })
     }
    });
  });

  const formik = useFormik({
    initialValues: {
      name: singleAdd.name,
      type: singleAdd.type,
      content_url: singleAdd.content_url,
      heading:singleAdd.heading,
      primary_text: singleAdd.primary_text,
      destination_url: singleAdd.destination_url,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, 'Must be 20 characters or less.')
        .required('Name must be required.'),
      type: Yup.string()
      .oneOf(
        ['IMAGE_AD', 'VIDEO_AD'],
      )
      .required('Type must be required.'),
       content_url:Yup.string()
       .youtubelinkValidator("Please provide valid youtube link.")
       .required("Content url must be required."),
      heading: Yup.string()
        .max(30, 'Must be 30 characters or less.')
        .required('Heading must be required.'), 
      primary_text:Yup.string()
        .max(120, 'Must be 120 characters or less.')
        .required('Primay text must be required.'),
      destination_url:Yup.string()
        .matches(
          regex,
          'Enter correct destination url.'
        )
        .required('destination url must be required.'),   
    }),
    onSubmit: values => {
      if(props.title === 'CREATE ADD'){
        dispatch(actionAdd.addAdd(values,props.pageData))
      }else{
         values._id = singleAdd._id
        dispatch(actionAdd.update(values))
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        > 
          <Typography component="h1" variant="h5">
          {props.title}
          </Typography>
          
          <Box component="form"  onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  fullWidth
                  id="name"
                  label="Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                 {formik.touched.name && formik.errors.name ? (
                    <div style={{color: "red"}}>{formik.errors.name}</div>
                  ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                 <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="type"
                  name="type"
                  label="type"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.type}
                >
                  <MenuItem value='IMAGE_AD'>IMAGE_AD</MenuItem>
                  <MenuItem value='VIDEO_AD'>VIDEO_AD</MenuItem>
                </Select>
                {formik.touched.type && formik.errors.type ? (
                    <div style={{color: "red"}} >{formik.errors.type}</div>
                  ) : null}
              </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="content_url"
                  label="Add url"
                  name="content_url"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.content_url}
                />
                {formik.touched.content_url && formik.errors.content_url ? (
                  <div style={{color: "red"}}>{formik.errors.content_url}</div>
                  ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={2}
                  fullWidth
                  name="heading"
                  label="heading"
                  type="text"
                  id="heading"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.heading}
                />
                {formik.touched.heading && formik.errors.heading ? (
                  <div style={{color: "red"}}>{formik.errors.heading}</div>
                  ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={2}
                  fullWidth
                  name="primary_text"
                  label="Primary text"
                  type="text"
                  id="primary_text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.primary_text}
                />
                {formik.touched.primary_text && formik.errors.primary_text ? (
                  <div style={{color: "red"}}>{formik.errors.primary_text}</div>
                  ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={1}
                  fullWidth
                  name="destination_url"
                  label="Destination url"
                  type="text"
                  id="destination_url"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.destination_url}
                />
                 {formik.touched.destination_url && formik.errors.destination_url ? (
                  <div style={{color: "red"}}>{formik.errors.destination_url}</div>
                  ) : null}
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  multiline
                  rows={2}
                  fullWidth
                  name="metadata"
                  label="Meta Data"
                  type="text"
                  id="metadata"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.metadata}
                />
                {formik.touched.metadata && formik.errors.metadata ? (
                  <div style={{color: "red"}}>{formik.errors.metadata}</div>
                  ) : null}
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              { props.title === 'CREATE ADD' &&
                   'Create Add'
              }
               { props.title === 'UPDATE ADD' &&
                   'Update Add'
              }
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}