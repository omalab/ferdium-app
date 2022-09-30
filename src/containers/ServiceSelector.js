import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import Layout from '../components/settings/SettingsLayout';

import UserStore from '../stores/UserStore';
import ServiceStore from '../stores/ServicesStore';
import Loader from '../components/ui/Loader';

import ServiceItem from '../components/settings/services/ServiceItem';

class ServiceSelector extends Component {
  componentWillUnmount() {
    this.props.actions.service.resetFilter();
    this.props.actions.service.resetStatus();
  }

  render() {
    const { services } = this.props.stores;
    const { closeServiceSelector } = this.props.actions.ui;

    const {
      setActive,
    } = this.props.actions.service;
    const isLoading = services.allServicesRequest.isExecuting;

    const currentWSServiceRecipes = services.currentWSServiceRecipes;
    const allServiceRecipes = services.allServiceRecipes;

    return (
      <Layout
        closeSettings={closeServiceSelector}
      >
        <div className="theme__dark settings settings__main" style={{ display: 'block', zIndex: -1, borderRadius: '6px' }}>
          <h2 className="headEmail">
            Select service
          </h2>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
            {
              currentWSServiceRecipes.length === 0 ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ paddingLeft: '25px', height: 'auto' }}>
                    No Service Found in current workspaces to open url
                  </div>
                  <hr />
                  <h1 style={{
                    margin: '15px',
                    padding: '10px 15px',
                    border: '1px #fff solid',
                    borderLeft: "0",
                    borderRight: '0'
                  }}>
                    Services from all workspace
                  </h1>
                  {console.log("tttt",allServiceRecipes, services.sendToUrl)}
                  <table className="service-table">
                    <tbody>
                      {allServiceRecipes.map(service => (
                        <ServiceItem
                          key={service.id}
                          service={service}
                          goToServiceForm={() => { setActive({ serviceId: service.id, url: services.sendToUrl }); }}
                        />
                      ))}
                    </tbody>
                  </table>

                </div>
              ) : (
                <table className="service-table">
                  <tbody>
                  {console.log("tttt", currentWSServiceRecipes, services.sendToUrl)}
                    {currentWSServiceRecipes.map(service => (
                      <ServiceItem
                        key={service.id}
                        service={service}
                        goToServiceForm={() => { setActive({ serviceId: service.id, url: services.sendToUrl }); }}
                      />
                    ))}
                  </tbody>
                </table>)
            }
          </div>
          )}
        </div>
      </Layout>

    );
  }
}

ServiceSelector.propTypes = {
  stores: PropTypes.shape({
    user: PropTypes.instanceOf(UserStore).isRequired,
    services: PropTypes.instanceOf(ServiceStore).isRequired,
    router: PropTypes.instanceOf(RouterStore).isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    service: PropTypes.shape({
      setActive: PropTypes.func.isRequired
    }).isRequired,
    ui: PropTypes.shape({
      closeServiceSelector: PropTypes.func.isRequired
    })
  }).isRequired,
};

export default inject('stores', 'actions')(observer(ServiceSelector))