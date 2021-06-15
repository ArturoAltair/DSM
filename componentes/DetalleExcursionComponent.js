import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Button, Modal } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { postComentario, postFavorito } from '../redux/ActionCreators';
import { baseUrl, colorGaztaroaOscuro } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos
  }
}

function RenderExcursion(props) {

  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card>
        <Card.Image source={{ uri: excursion.imagen }}>
          <Card.Title style={styles.cardTitleStyle}>{excursion.nombre}</Card.Title>
        </Card.Image>
        <Text style={{ margin: 20 }}>
          {excursion.descripcion}
        </Text>
        <Icon
          raised
          reverse
          name={props.favorita ? 'heart' : 'heart-o'}
          type='font-awesome'
          color='#f50'
          onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
        />
        <Icon
          raised
          reverse
          name='pencil'
          color='#333fff'
          type='font-awesome'
          onPress={() => props.gestionar()}
        />
      </Card>
    );
  }
  else {
    return (<View></View>);
  }
}

function RenderComentario(props) {

  const comentarios = props.comentarios;

  const renderCommentarioItem = ({ item, index }) => {

    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
        <Text style={{ fontSize: 12 }}>{item.valoracion} Stars</Text>
        <Text style={{ fontSize: 12 }}>{'-- ' + item.autor + ', ' + item.dia} </Text>
      </View>
    );
  };

  return (
    <Card>
      <Card.Title>Comentarios</Card.Title>
      <Card.Divider />
      <FlatList
        data={comentarios}
        renderItem={renderCommentarioItem}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
  );
}

const mapDispatchToProps = dispatch => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (comentarioarray) => dispatch(postComentario(comentarioarray))
})

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      inputnombre: "",
      inputcomentario: "",
      valorrating: ""
      //         favoritos: []
    };
  }

  marcarFavorito(excursionId) {
    // this.setState({favoritos: this.state.favoritos.concat(excursionId)});
    this.props.postFavorito(excursionId);

  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm() {
    this.setState({
      showModal: false
    });
  }

  gestionarModal() {
    this.toggleModal();
  }

  gestionarEnviar() {
    this.toggleModal();
  }

  gestionarComentario(excursionId) {
    
console.log(excursionId);
console.log(this.state.valorrating);
console.log(this.state.inputcomentario);
console.log(this.state.inputnombre);

    var comentarioarray=new Object();

    comentarioarray.excursionId= excursionId;
    comentarioarray.valoracion= this.state.valorrating;
    comentarioarray.autor= this.state.inputnombre;
    comentarioarray.comentario= this.state.inputcomentario;
    comentarioarray.dia= new Date();

    console.log(comentarioarray);
    this.props.postComentario(comentarioarray)
  }

  render() {
    const { excursionId } = this.props.route.params;
    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          // favorita={this.state.favoritos.some(el => el === excursionId)}
          favorita={this.props.favoritos.some(el => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
          gestionar={() => this.gestionarModal()}
        />
        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
        />
        <Modal animationType={"slide"} transparent={false}
          visible={this.state.showModal}
          onDismiss={() => { this.toggleModal(); this.resetForm(); }}
          onRequestClose={() => { this.toggleModal(); this.resetForm(); }}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Prueba</Text>
            <Rating
              showRating
              onFinishRating={value => this.setState({ valorrating: value })}
              startingvalue={3}
              style={{ paddingVertical: 10 }}
            />
            <Text style={styles.modalTitle}>Nombre del excursionista:</Text>
            <Input
              placeholder="Comment"
              leftIcon={{ type: 'font-awesome', name: 'comment' }}
              onChangeText={value => this.setState({ inputnombre: value })}
            />
            <Text style={styles.modalTitle}>Comentario de la excursión:</Text>
            <Input
              placeholder="Comment"
              leftIcon={{ type: 'font-awesome', name: 'comment' }}
              onChangeText={value => this.setState({ inputcomentario: value })}
            />
            {/* <Text style={styles.modalText}>Edad: {this.state.edad}</Text>
            <Text style={styles.modalText}>Federado?: {this.state.federado ? 'Si' : 'No'}</Text>
            <Text style={styles.modalText}>Día y hora: {this.state.fecha.getDate()}/{this.state.fecha.getMonth() + 1}/{this.state.fecha.getFullYear()} </Text>{new Intl.DateTimeFormat('default', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(Date.parse(this.state.fecha))}</Text> */}
            <Button
              // onPress={() => { this.toggleModal(); this.resetForm(); }}
              onPress={() => { this.gestionarComentario(excursionId); this.toggleModal(); this.resetForm(); this.setState({ inputcomentario:"", inputnombre:""})  }}
              color={colorGaztaroaOscuro}
              title="Enviar"
            />
            <Button
              onPress={() => { this.toggleModal(); this.resetForm(); this.setState({ inputcomentario:"", inputnombre:"", valorrating:3}) }}
              color={colorGaztaroaOscuro}
              title="Cerrar"
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);