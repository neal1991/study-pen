.class Landroid/support/v7/widget/ActionMenuView$d;
.super Ljava/lang/Object;

# interfaces
.implements Landroid/support/v7/view/menu/f$a;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroid/support/v7/widget/ActionMenuView;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x2
    name = "d"
.end annotation


# instance fields
.field final synthetic a:Landroid/support/v7/widget/ActionMenuView;


# direct methods
.method private constructor <init>(Landroid/support/v7/widget/ActionMenuView;)V
    .locals 0

    iput-object p1, p0, Landroid/support/v7/widget/ActionMenuView$d;->a:Landroid/support/v7/widget/ActionMenuView;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method

.method synthetic constructor <init>(Landroid/support/v7/widget/ActionMenuView;Landroid/support/v7/widget/ActionMenuView$1;)V
    .locals 0

    invoke-direct {p0, p1}, Landroid/support/v7/widget/ActionMenuView$d;-><init>(Landroid/support/v7/widget/ActionMenuView;)V

    return-void
.end method


# virtual methods
.method public a(Landroid/support/v7/view/menu/f;)V
    .locals 1

    iget-object v0, p0, Landroid/support/v7/widget/ActionMenuView$d;->a:Landroid/support/v7/widget/ActionMenuView;

    invoke-static {v0}, Landroid/support/v7/widget/ActionMenuView;->b(Landroid/support/v7/widget/ActionMenuView;)Landroid/support/v7/view/menu/f$a;

    move-result-object v0

    if-eqz v0, :cond_0

    iget-object v0, p0, Landroid/support/v7/widget/ActionMenuView$d;->a:Landroid/support/v7/widget/ActionMenuView;

    invoke-static {v0}, Landroid/support/v7/widget/ActionMenuView;->b(Landroid/support/v7/widget/ActionMenuView;)Landroid/support/v7/view/menu/f$a;

    move-result-object v0

    invoke-interface {v0, p1}, Landroid/support/v7/view/menu/f$a;->a(Landroid/support/v7/view/menu/f;)V

    :cond_0
    return-void
.end method

.method public a(Landroid/support/v7/view/menu/f;Landroid/view/MenuItem;)Z
    .locals 0

    iget-object p1, p0, Landroid/support/v7/widget/ActionMenuView$d;->a:Landroid/support/v7/widget/ActionMenuView;

    invoke-static {p1}, Landroid/support/v7/widget/ActionMenuView;->a(Landroid/support/v7/widget/ActionMenuView;)Landroid/support/v7/widget/ActionMenuView$e;

    move-result-object p1

    if-eqz p1, :cond_0

    iget-object p1, p0, Landroid/support/v7/widget/ActionMenuView$d;->a:Landroid/support/v7/widget/ActionMenuView;

    invoke-static {p1}, Landroid/support/v7/widget/ActionMenuView;->a(Landroid/support/v7/widget/ActionMenuView;)Landroid/support/v7/widget/ActionMenuView$e;

    move-result-object p1

    invoke-interface {p1, p2}, Landroid/support/v7/widget/ActionMenuView$e;->a(Landroid/view/MenuItem;)Z

    move-result p1

    if-eqz p1, :cond_0

    const/4 p1, 0x1

    return p1

    :cond_0
    const/4 p1, 0x0

    return p1
.end method
