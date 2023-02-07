const axios = require('axios')

class AppService {
  orderToJob(order) {
    return {
      job: {
        pickups: [
          {
            address: order.package.collect_task.address.street_name,
          },
        ],
        dropoffs: [
          {
            client_reference: order.package.reference,
            package_type: order.package.dimensions.size,
            address: order.package.deliver_task.address.street_name,
            contact: {
              contact_phone: order.package.dimensions.size,
            },
          },
        ],
      },
    };
  }

  async createJobDelay({ job }) {
    const { HTTP_DELAY_IN_SECONDS = 2 } = process.env
    const { data } = await axios.get(`https://httpbin.org/delay/${HTTP_DELAY_IN_SECONDS}`);
    return this.createJob({ job });
  }

  async createJob({ job }) {
    const dropoff = job.dropoffs[0];
    const pickup = job.pickups[0];

    return {
      id: 100432273,
      status: 'in_progress',
      package_type: dropoff.package_type,
      pickup_at: '2023-01-25T12:52:00.000+01:00',
      deliveries: [
        {
          id: 100515659,
          status: 'waiting_at_dropoff',
          picked_at: '2023-01-25T12:50:34.000+01:00',
          delivered_at: null,
          client_reference: dropoff.client_reference,
          package_description: null,
          package_type: dropoff.package_type,
          pickup: {
            id: 2598682,
            address: {
              street: pickup.address,
            },
          },
          dropoff: {
            id: 2598683,
            address: {
              street: dropoff.address,
            },
            contact: {
              phone: dropoff.contact.contact_phone,
              company_name: null,
              email: null,
            },
          },
        },
      ],
    };
  }

  jobToOrder(jobResponse) {
    const delivery = jobResponse.deliveries[0];
    return {
      package: {
        reference: delivery.client_reference,
      },
    };
  }
}

module.exports = { AppService }
