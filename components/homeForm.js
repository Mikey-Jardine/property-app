import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/home";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    price: '',
    displayAddress: '',
    sizeStringMeters: '',
    bedsString: '',
    berRating: '',
}

const Homes = ({ classes, ...props }) => {

    const { addToast } = useToasts()

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('price' in fieldValues)
            temp.price = fieldValues.price ? "" : "This field is required."
        if ('displayAddress' in fieldValues)
            temp.displayAddress = fieldValues.displayAddress ? "" : "This field is required."
        if ('berRating' in fieldValues)
            temp.berRating = fieldValues.berRating ? "" : "This field is required."
        if ('sizeStringMeters' in fieldValues)
            temp.sizeStringMeters = fieldValues.sizeStringMeters ? "" : "sizeStringMeters is not valid."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId == 0)
                props.createHome(values, onSuccess)
            else
                props.updateHome(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.HomeList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="price"
                        variant="outlined"
                        label="Price"
                        value={values.price}
                        onChange={handleInputChange}
                        {...(errors.price && { error: true, helperText: errors.price })}
                    />
                    <TextField
                        name="sizeStringMeters"
                        variant="outlined"
                        label="Size Meters"
                        value={values.sizeStringMeters}
                        onChange={handleInputChange}
                        {...(errors.sizeStringMeters && { error: true, helperText: errors.sizeStringMeters })}
                    />
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.berRating && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Ber Rating</InputLabel>
                        <Select
                            name="berRating"
                            value={values.berRating}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">Select Ber Rating</MenuItem>
                            <MenuItem value="A">A</MenuItem>
                            <MenuItem value="B">B</MenuItem>
                            <MenuItem value="C">C</MenuItem>
                            <MenuItem value="D">D</MenuItem>
                            <MenuItem value="E">E</MenuItem>
                            <MenuItem value="F">F</MenuItem>
                            <MenuItem value="G">G</MenuItem>
                            <MenuItem value="H">H</MenuItem>
                        </Select>
                        {errors.berRating && <FormHelperText>{errors.berRating}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>

                    <TextField
                        name="displayAddress"
                        variant="outlined"
                        label="Display Address"
                        value={values.displayAddress}
                        onChange={handleInputChange}
                        {...(errors.displayAddress && { error: true, helperText: errors.displayAddress })}
                    />
                    <TextField
                        name="bedsString"
                        variant="outlined"
                        label="Beds"
                        value={values.bedsString}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    HomeList: state.Home.list
})

const mapActionToProps = {
    createHome: actions.create,
    updateHome: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Homes));