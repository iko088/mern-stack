import { useAuth } from '../store/auth'

const Service = () => {

  const { services } = useAuth();
 
  if (!Array.isArray(services)) {
    console.error('Services is not an array:', services);
    return null; // or handle it in a way that makes sense for your application
  }

  return (
    <>
     <div className="service-display">
     { services.map((services, index) => {
        const { service, description, price, provider } = services
        return (
          <div className="service" key={index}>
            <img src="/images/design.png" alt="" />
            <div className="service-dip">
              <h2 className='service-provider'> {provider} </h2>
              <h2 className='service-provider service-price'> {price} </h2>
            </div>
            <h1 className='service-name'> {service} </h1>
            <p className='service-description'> {description} </p>
          </div>
        )
      })}
     </div>
    </>
  )
}

export default Service
