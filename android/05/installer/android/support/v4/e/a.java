package android.support.v4.e;

import android.os.AsyncTask;
import android.os.Build;

public final class a {
  public static <Params, Progress, Result> AsyncTask<Params, Progress, Result> a(AsyncTask<Params, Progress, Result> paramAsyncTask, Params... paramVarArgs) {
    if (paramAsyncTask == null)
      throw new IllegalArgumentException("task can not be null"); 
    if (Build.VERSION.SDK_INT >= 11) {
      b.a(paramAsyncTask, paramVarArgs);
      return paramAsyncTask;
    } 
    paramAsyncTask.execute(paramVarArgs);
    return paramAsyncTask;
  }
}


/* Location:              /Users/dongbing/project/study-pen/android/05/classes-dex2jar.jar!/android/support/v4/e/a.class
 * Java compiler version: 6 (50.0)
 * JD-Core Version:       1.0.7
 */