package android.support.v4.g;

public class c {
  public static void a(Object paramObject, StringBuilder paramStringBuilder) { // Byte code:
    //   0: aload_0
    //   1: ifnonnull -> 14
    //   4: ldc 'null'
    //   6: astore_0
    //   7: aload_1
    //   8: aload_0
    //   9: invokevirtual append : (Ljava/lang/String;)Ljava/lang/StringBuilder;
    //   12: pop
    //   13: return
    //   14: aload_0
    //   15: invokevirtual getClass : ()Ljava/lang/Class;
    //   18: invokevirtual getSimpleName : ()Ljava/lang/String;
    //   21: astore_2
    //   22: aload_2
    //   23: ifnull -> 35
    //   26: aload_2
    //   27: astore_3
    //   28: aload_2
    //   29: invokevirtual length : ()I
    //   32: ifgt -> 67
    //   35: aload_0
    //   36: invokevirtual getClass : ()Ljava/lang/Class;
    //   39: invokevirtual getName : ()Ljava/lang/String;
    //   42: astore_2
    //   43: aload_2
    //   44: bipush #46
    //   46: invokevirtual lastIndexOf : (I)I
    //   49: istore #4
    //   51: aload_2
    //   52: astore_3
    //   53: iload #4
    //   55: ifle -> 67
    //   58: aload_2
    //   59: iload #4
    //   61: iconst_1
    //   62: iadd
    //   63: invokevirtual substring : (I)Ljava/lang/String;
    //   66: astore_3
    //   67: aload_1
    //   68: aload_3
    //   69: invokevirtual append : (Ljava/lang/String;)Ljava/lang/StringBuilder;
    //   72: pop
    //   73: aload_1
    //   74: bipush #123
    //   76: invokevirtual append : (C)Ljava/lang/StringBuilder;
    //   79: pop
    //   80: aload_0
    //   81: invokestatic identityHashCode : (Ljava/lang/Object;)I
    //   84: invokestatic toHexString : (I)Ljava/lang/String;
    //   87: astore_0
    //   88: goto -> 7 }
}


/* Location:              /Users/dongbing/project/study-pen/android/05/classes-dex2jar.jar!/android/support/v4/g/c.class
 * Java compiler version: 6 (50.0)
 * JD-Core Version:       1.0.7
 */