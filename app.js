import angular from 'angular';

const appModule = angular.module('App', [])
.controller('AppController', function AppController() {

	function requestPaymentMethod(dropinInstance) {
		dropinInstance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
            if (requestPaymentMethodErr) {
                dropinInstance.clearSelectedPaymentMethod();
                return;
            }

            alert('payment method requested');
        });
	}
	var button = document.querySelector('#pay-button');
	import('braintree-web-drop-in').then(dropin => {
		dropin.create({
			authorization: 'input_token_here',
			container: '#dropin-container',
			threeDSecure: {
				amount: '12'
			},
			card: {
				vault: {
					vaultCard: false
				}
			}
		}, (createErr, instance) => {
			instance.on('paymentMethodRequestable', event => {
				console.info('paymentMethodRequestable');
				if (event.paymentMethodIsSelected) {
					requestPaymentMethod(instance);
				}

			});
			instance.on('noPaymentMethodRequestable', () => {
				console.info('noPaymentMethodRequestable');
			});
			button.addEventListener('click', () => {
				console.info('click');
				requestPaymentMethod(instance);
			});
		});
	});
});

export default appModule;