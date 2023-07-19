import {AuthenticationBindings} from '@loopback/authentication';
import {
  Getter,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
  globalInterceptor,
  inject
} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {intersection} from 'lodash';
import {MyUserProfile} from '../types';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@globalInterceptor('', {tags: {name: 'authorize'}})
export class AuthorizeInterceptor implements Provider<Interceptor> {

  constructor(
    @inject(AuthenticationBindings.METADATA)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public metadata: any,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    public getCurrentUser: Getter<MyUserProfile>,
  ) {}


  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    // eslint-disable-next-line no-useless-catch
    try {
      console.log('Log from authorize global interceptor');
      // console.log('Metadata ',this.metadata[0]);
      // //if you will not provide options in your @authenticate decorator
      //this line will be executed
      // eslint-disable-next-line @typescript-eslint/return-await
      if (!this.metadata) return await next();

      if (this.metadata) {
        // eslint-disable-next-line @typescript-eslint/return-await
        if (!this.metadata[0]?.options?.required) return await next();
      }

      const requiredPermissions = this.metadata[0]?.options?.required;
      console.log("requiredPermissions ", requiredPermissions);

      const currentUserData = await this.getCurrentUser();
      console.log("currentUserData.permissions ",currentUserData);

      const results = intersection(
        currentUserData.permissions,
        requiredPermissions,
      ).length;

      console.log("results ", results);

      if (results !== requiredPermissions.length) {
        throw new HttpErrors.Forbidden('INVALID ACCESS PERMISSIONS');
      }
      const result = await next();
      // Add post-invocation logic here
      return result;
    } catch (err) {
      // Add error handling logic here
      throw err;
    }
  }
}
