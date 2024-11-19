const axios = require('axios');
const xml2js = require('xml2js');

// Función para consumir el servicio web SOAP del BCCR
const ConsumirServicioBCCR = async (req, res) => {
  try {
    // Parámetros de la solicitud
    const Indicador = "317"; // Código del indicador (por ejemplo, tipo de cambio compra)
    const FechaInicio = "04/11/2024";
    const FechaFinal = "04/11/2024";
    const Nombre = "Esteban Cervantes";
    const SubNiveles = "N"; // No se requieren subniveles
    const CorreoElectronico = "ecervantes@cmvlatam.com";
    const Token = "RST0LAENO8"; // Reemplaza con el token real

    // Construcción del cuerpo SOAP
    const soapBody = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ObtenerIndicadoresEconomicos xmlns="http://ws.sdde.bccr.fi.cr">
      <Indicador>${Indicador}</Indicador>
      <FechaInicio>${FechaInicio}</FechaInicio>
      <FechaFinal>${FechaFinal}</FechaFinal>
      <Nombre>${Nombre}</Nombre>
      <SubNiveles>${SubNiveles}</SubNiveles>
      <CorreoElectronico>${CorreoElectronico}</CorreoElectronico>
      <Token>${Token}</Token>
    </ObtenerIndicadoresEconomicos>
  </soap:Body>
</soap:Envelope>`;

    // Enviar la solicitud SOAP utilizando Axios
    const response = await axios.post('https://gee.bccr.fi.cr/Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx', soapBody, {
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://ws.sdde.bccr.fi.cr/ObtenerIndicadoresEconomicos',
      },
    });

    // Procesar la respuesta XML
    const parser = new xml2js.Parser({ explicitArray: false });
    parser.parseString(response.data, (err, result) => {
      if (err) {
        return res.status(500).send({
          Codigo: 1,
          Descripcion: "Error al procesar la respuesta del servicio",
          Error: err.message,
        });
      }

      // Acceder al valor de NUM_VALOR
      const numValor = result['soap:Envelope']['soap:Body']['ObtenerIndicadoresEconomicosResponse']['ObtenerIndicadoresEconomicosResult']['diffgr:diffgram']
        && result['soap:Envelope']['soap:Body']['ObtenerIndicadoresEconomicosResponse']['ObtenerIndicadoresEconomicosResult']['diffgr:diffgram']
          .Datos_de_INGC011_CAT_INDICADORECONOMIC
        && result['soap:Envelope']['soap:Body']['ObtenerIndicadoresEconomicosResponse']['ObtenerIndicadoresEconomicosResult']['diffgr:diffgram']
          .Datos_de_INGC011_CAT_INDICADORECONOMIC.INGC011_CAT_INDICADORECONOMIC
        ? result['soap:Envelope']['soap:Body']['ObtenerIndicadoresEconomicosResponse']['ObtenerIndicadoresEconomicosResult']['diffgr:diffgram']
            .Datos_de_INGC011_CAT_INDICADORECONOMIC.INGC011_CAT_INDICADORECONOMIC.NUM_VALOR
        : null;

      if (numValor !== null) {
        return res.send({
          Codigo: 0,
          Descripcion: "Datos obtenidos correctamente",
          Indicador: Indicador,
          NUM_VALOR: numValor, // Aquí devolvemos el valor de NUM_VALOR
        });
      } else {
        return res.status(400).send({
          Codigo: 1,
          Descripcion: "No se encontró el valor de NUM_VALOR en la respuesta",
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      Codigo: 1,
      Descripcion: "Error en la solicitud al servicio SOAP",
      Error: error.message,
    });
  }
};

module.exports = {
  ConsumirServicioBCCR,
};
