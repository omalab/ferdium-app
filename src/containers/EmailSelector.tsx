import { Component, Key, ReactElement } from 'react';
import { inject, observer } from 'mobx-react';
import Layout from '../components/settings/SettingsLayout';

import Loader from '../components/ui/Loader';

import ServiceItem from '../components/settings/services/ServiceItem';
import { StoresProps } from 'src/@types/ferdium-components.types';

class EmailSelector extends Component<StoresProps> {
  componentWillUnmount() {
    this.props.actions.service.resetFilter();
    this.props.actions.service.resetStatus();
  }

  render(): ReactElement {
    const { services } = this.props.stores;
    const { closeEmailSelector } = this.props.actions.ui;

    const { setEmailActive, setActive } = this.props.actions.service;
    const isLoading = services.allServicesRequest.isExecuting;

    const { currentWSEmailRecipes } = services;
    const { allEmailRecipes } = services;

    return (
      <Layout closeSettings={closeEmailSelector}>
        <div
          className="theme__dark settings settings__main"
          style={{ display: 'block', zIndex: -1, borderRadius: '6px' }}
        >
          <h2 className="headEmail">Select an email app</h2>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              {currentWSEmailRecipes.length === 0 ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ paddingLeft: '25px', height: 'auto' }}>
                    No Email Service Found in current workspaces
                  </div>
                  <hr />
                  <h1
                    style={{
                      margin: '15px',
                      padding: '10px 15px',
                      border: '1px #fff solid',
                      borderLeft: '0',
                      borderRight: '0',
                    }}
                  >
                    Email Services from all workspace
                  </h1>
                  <table className="service-table">
                    <tbody>
                      {services.listAllServices
                        .filter(
                          (el: { recipe: { id: string } }) =>
                            el.recipe.id === 'default',
                        )
                        .map((service: { id: Key | null | undefined }) => (
                          <ServiceItem
                            key={service.id}
                            service={service}
                            goToServiceForm={() => {
                              setActive({
                                serviceId: service.id,
                                url: services.sendToUrl,
                              });
                            }}
                          />
                        ))}
                      {allEmailRecipes.map(service => (
                        <ServiceItem
                          key={service.id}
                          service={service}
                          goToServiceForm={() => {
                            setEmailActive({ serviceId: service.id });
                          }}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <table className="service-table">
                  <tbody>
                    {currentWSEmailRecipes.map(service => (
                      <ServiceItem
                        key={service.id}
                        service={service}
                        goToServiceForm={() => {
                          setEmailActive({ serviceId: service.id });
                        }}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

export default inject('stores', 'actions')(observer(EmailSelector));
