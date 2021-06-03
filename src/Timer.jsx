import * as React from 'react';

export default class Timer extends React.Component {
  interval = null;
  constructor(props) {
    console.log('Constructor');
    super(props);
    this.state = {
      initial: 0,
      time: 0,
    };
  }
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    if (props.time !== state.initial) {
      return {
        initial: props.time,
        time: props.time,
      };
    }
    return null;
  }
  render() {
      console.log('render');
      return <div>{this.state.time}</div>
  }
  componentDidMount() {
    /* Diese Lifecycle-Methode ist ein guter Ort, um ein Zeitinterval 
    festzulegen. Die Erklörungen, die man findet sind alle Grütze. 
    Deshalb erklär' ichs mir selbst. componentDidMount wird nur einmal
    ausgeführt. Aber die setInteval Funktion, wenn einmal losgetreten,
    läuft endlos und aktualisiert state.time jede Sekunde. 
    Dadurch ist state.time immer 
    eine Sekunde weiter als state.initial, was dann dazu führt, dass beide
    Werte von getDerivedStateFromProps wieder gleichgesetzt werden. Dies 
    bewirkt, dass auch render() jede Sekunde neu ausgeführt wird, und somit
    der neue Wert zur Anzeige kommt.
    */
    console.log('componentDidMount');
    this.interval = setInterval(
      () => this.setState(state => ({ time: state.time + 1 })),
      1000,
    )
  }
  shouldComponentUpdate(newProps, newState) {
    /* Bestimmt, ob die Komponente nach einem setState-Aufruf neu gezeicnnet 
     werden soll. Über die Argumente hat man Zugriff auf die aktuellen Props 
     und den neuesten state. Die Methode gibt entweder true oder false zurück. Wird 
     false zurückgegeben, wird die render()-Methode nicht neu aufgerufen.
     Im vorliegenden Beispiel wird shouldComponentUpdate dazu benutzt, die 
     Komponente nur nach jeder 2. state-Änderung neu zu zeichnen, d.h nur 
     dann, wenn state.time durch 2 teilbar ist.
     */
     console.log('shouldComponentUpdate');
     return newState.time % 2 === 0;
     
    }
  getSnapshotBeforeUpdate(oldProps, oldState) {
    /* Wird ausgeführt, nachdem render() ausgeführt wurde, aber bevor 
     die Änderungen angezeigt werden. Die Argumente geben Zugriff auf die 
     jeweils vorherigen Props und den vorherigen state. Der Rückgabewert 
     der Methode muss 'null' oder ein Wert sein. Dieser Wert steht dann 
     in der componentDidUpdate-Methode zur Verfügung. Die 
     getSnapshotBeforeUpdate-Methode wird nicht ausgeführt, wenn 
     shouldComponentUpdate zuvor false zurückliefert. Im Beispiel ist der 
     Wert der aktualle Zeitstempel. */
     console.log('getSnapshotBeforeUpdate');
     return Date.now();
     }
  componentDidUpdate(oldProps, oldState, snapshot) {
    /* Die letzte LIfecycle-Method in der Updating-Phase. Die Arguement geben 
     Zugriff auf die vorherigen Props und den vorherigen state, sowie den 
     von getSnapshotBeforeUpdate zurückgegebenen Wert. Mit der Methode 
     läßt sich z.B. herausfinden, ob sich im aktuellen Updating-Abschnitt 
     bestimmte Werte verändert haben. Im vorliegenden Beispiel wird überprüft, 
     ob sich state.initial verändert hat, ob also der Benutzer den 
     Button geklickt hat. Ist dies der Fall, wird der Zeitstempel von 
     getSnapshotBeforeUpdate ausgegeben.
      (auf die gegenwärtigen Props und den 
     gegenwärtigen state kann auch zugegriffen werden. ) */
     
      console.log('componentDidUpdate');
      if (oldState.initial !== this.state.initial) {
        console.log(`${snapshot}: Zeit wurde zurückgesetzt`);
        }
    }
}
