import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { EXCURSIONES } from '../comun/excursiones';
import { CABECERAS } from '../comun/cabeceras';
import { ACTIVIDADES } from '../comun/actividades';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        actividades: state.actividades,
        excursiones: state.excursiones,
        cabeceras: state.cabeceras
    }
}


const styles = StyleSheet.create({
    EstadoChocolate: {
        color: 'chocolate',
        fontWeight: 'bold'
    }
})

function RenderItem(props) {

    const item = props.item;

    if (item != null) {
        return (
            <Card>
                <Card.Title style={styles.EstadoChocolate}>{item.nombre}</Card.Title>
                <Card.Divider />
                <Card.Image source={{ uri: baseUrl + item.imagen }}></Card.Image>
                <Text style={{ margin: 20 }}>
                    {item.descripcion}
                </Text>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

class Home extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         excursiones: EXCURSIONES,
    //         cabeceras: CABECERAS,
    //         actividades: ACTIVIDADES
    //     };
    // }

    render() {

        return (
            <ScrollView>
                <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);