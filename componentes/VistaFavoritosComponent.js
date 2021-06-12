import React, { Component } from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { SafeAreaView, FlatList, Text, View, Alert } from 'react-native';
import { IndicadorActividad } from './IndicadorActividadComponent';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { borrarFavorito } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        favoritos: state.favoritos,
        excursiones: state.excursiones
    }
}

const mapDispatchToProps = dispatch => ({
    borrarFavorito: (excursionId) => dispatch(borrarFavorito(excursionId))
})

class VistaFavoritos extends Component {

    render() {

        const { navigate } = this.props.navigation;

        const renderFavoritoItem = ({ item, index }) => {
            const rightButton = [
                {
                    text: 'Borrar',
                    type: 'delete',
                    onPress: () => showAlert()
                }
            ];

            const showAlert = () =>
                Alert.alert(
                    "Borrar Excursión Favorita?",
                    "Confirme que desea borrar la excursión: " + item.nombre,
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log(item.nombre + ' Favorito no borrado')
                        },
                        {
                            text: "Ok",
                            onPress: () => this.props.borrarFavorito(item.id)
                        }
                    ],
                );
                
            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <ListItem
                        key={index}
                        onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
                        onLongPress={()=> showAlert()}
                        bottomDivider>
                        <Avatar source={{ uri: baseUrl + item.imagen }} />
                        <ListItem.Content>
                            <ListItem.Title>{item.nombre}</ListItem.Title>
                            <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </Swipeout>
            );
        };

        // if (this.props.excursiones.isLoading) {
        //     return (
        //         <IndicadorActividad />
        //     );
        // }
        // else if (this.props.excursiones.errMess) {
        //     return (
        //         <View>
        //             <Text>{this.props.errMess}</Text>
        //         </View>
        //     );
        // } else {

        if (this.props.favoritos.length > 0) {
            let fav = [];
            this.props.favoritos.sort();
            this.props.favoritos.forEach(id => {
                fav.push(this.props.excursiones.excursiones[id])
            });

            return (
                <SafeAreaView>
                    <FlatList
                        data={fav}
                        renderItem={renderFavoritoItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </SafeAreaView>
            );
        } else {
            return (
                <SafeAreaView>
                    <FlatList
                        data={this.props.favoritos.favoritos}
                        renderItem={renderFavoritoItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </SafeAreaView>
            );
        }
    }
    // }
}

export default connect(mapStateToProps, mapDispatchToProps)(VistaFavoritos);