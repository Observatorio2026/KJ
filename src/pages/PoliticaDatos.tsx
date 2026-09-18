import Pagina from '../components/Pagina'
import { useSitio } from '../context/SitioContext'

export default function PoliticaDatos() {
  const { ajustes } = useSitio()
  return (
    <Pagina titulo="Política de tratamiento de datos" bajada="Cómo se usan los datos que nos deja al escribirnos o al suscribirse.">
      <div className="prosa max-w-medida text-[15px] text-grafito/80">
        <p>
          En cumplimiento de la Ley 1581 de 2012 y del Decreto 1377 de 2013, el despacho de {ajustes?.concejal_nombre}
          informa cómo trata los datos personales que recibe a través de este sitio.
        </p>
        <h2>Qué datos recogemos</h2>
        <p>
          Nombre, correo electrónico, teléfono y barrio o vereda cuando la persona radica una petición, y correo
          electrónico cuando se suscribe al boletín. No recogemos datos sensibles ni datos de menores de edad.
        </p>
        <h2>Para qué los usamos</h2>
        <ul>
          <li>Responder la petición, queja, reclamo o denuncia radicada.</li>
          <li>Trasladar la solicitud a la entidad competente cuando corresponda.</li>
          <li>Enviar el boletín de gestión, solo a quien lo autorice.</li>
        </ul>
        <h2>Sus derechos</h2>
        <p>
          Puede conocer, actualizar, rectificar o suprimir sus datos, y revocar la autorización, escribiendo a {ajustes?.email_contacto}.
        </p>
        <h2>Conservación</h2>
        <p>Los datos se conservan durante el periodo {ajustes?.periodo} y por el término que exijan las normas de archivo.</p>
      </div>
    </Pagina>
  )
}
