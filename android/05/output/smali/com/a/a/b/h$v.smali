.class final Lcom/a/a/b/h$v;
.super Ljava/util/AbstractCollection;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Lcom/a/a/b/h;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x10
    name = "v"
.end annotation

.annotation system Ldalvik/annotation/Signature;
    value = {
        "Ljava/util/AbstractCollection<",
        "TV;>;"
    }
.end annotation


# instance fields
.field final synthetic a:Lcom/a/a/b/h;


# direct methods
.method constructor <init>(Lcom/a/a/b/h;)V
    .locals 0

    iput-object p1, p0, Lcom/a/a/b/h$v;->a:Lcom/a/a/b/h;

    invoke-direct {p0}, Ljava/util/AbstractCollection;-><init>()V

    return-void
.end method


# virtual methods
.method public clear()V
    .locals 1

    iget-object v0, p0, Lcom/a/a/b/h$v;->a:Lcom/a/a/b/h;

    invoke-virtual {v0}, Lcom/a/a/b/h;->clear()V

    return-void
.end method

.method public contains(Ljava/lang/Object;)Z
    .locals 1

    iget-object v0, p0, Lcom/a/a/b/h$v;->a:Lcom/a/a/b/h;

    invoke-virtual {v0, p1}, Lcom/a/a/b/h;->containsValue(Ljava/lang/Object;)Z

    move-result p1

    return p1
.end method

.method public isEmpty()Z
    .locals 1

    iget-object v0, p0, Lcom/a/a/b/h$v;->a:Lcom/a/a/b/h;

    invoke-virtual {v0}, Lcom/a/a/b/h;->isEmpty()Z

    move-result v0

    return v0
.end method

.method public iterator()Ljava/util/Iterator;
    .locals 2
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "()",
            "Ljava/util/Iterator<",
            "TV;>;"
        }
    .end annotation

    new-instance v0, Lcom/a/a/b/h$t;

    iget-object v1, p0, Lcom/a/a/b/h$v;->a:Lcom/a/a/b/h;

    invoke-direct {v0, v1}, Lcom/a/a/b/h$t;-><init>(Lcom/a/a/b/h;)V

    return-object v0
.end method

.method public size()I
    .locals 1

    iget-object v0, p0, Lcom/a/a/b/h$v;->a:Lcom/a/a/b/h;

    invoke-virtual {v0}, Lcom/a/a/b/h;->size()I

    move-result v0

    return v0
.end method
