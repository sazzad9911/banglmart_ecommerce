import { BkashGateway } from 'bkash-payment-gateway'

const bkashConfig = {
	baseURL: 'https://checkout.sandbox.bka.sh/v1.2.0-beta', //do not add a trailing slash
	key: 'gMzFs9YXobi6ZEzKUXCVMNhXtc',
	username: '01713337825',
	password: 'B48P+OWF7d:',
	secret: 'IzEXF0oSfHuSQgrGTqpejILwkAp2FFELnSpuUzQkClVYWWFR8FUr',
};

const bkash = new BkashGateway(bkashConfig);
export default bkash;